import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { PlayRequest } from '@shared/IPlayCard';
import { Card } from './model/cards/card';
import { Deck } from './model/cards/cardCollection';

import { GameData } from './model/GameData'; 

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: { origin: "*" }
});

app.get('/', (req, res) => {
    res.send('<h1>Serveur Crapette Opérationnel</h1>');
});

const players = new Map();
let game: GameData | null = null;
const minuteursDeconnexion = new Map();

io.on('connection', (socket) => {
    let sessionId = socket.handshake.auth.sessionId;
    const pseudo = socket.handshake.auth.pseudo;

    const sendGameState = () => {
        console.log('send state');
        
        const inGamePlayers = Array.from(players);
        const id1 = inGamePlayers[0][0];
        const data1 = inGamePlayers[0][1];
            
        const id2 = inGamePlayers[1][0];
        const data2 = inGamePlayers[1][1];
            
        io.to(data1.socketId).emit('updateBoard', game?.getGameState(id1));
        io.to(data2.socketId).emit('updateBoard', game?.getGameState(id2));
    }

    const gameWon = () => {
        const won = game?.getStatus()
        if (won === "won"){
            const winnerId = game?.getWinnerId()
            if (winnerId === null ){
                throw new Error('Uh, its not normal... No winner id even if someone won the game...')
            }
            const timerId = setTimeout(() => {
            }, 1000);
            const inGamePlayers = Array.from(players);
            const id1 = inGamePlayers[0][0];
            const data1 = inGamePlayers[0][1];
                
            const id2 = inGamePlayers[1][0];
            const data2 = inGamePlayers[1][1];

            if (winnerId === id1){
                io.to(data1.socketId).emit('won');
                io.to(data2.socketId).emit('lost');
            }
            else{
                io.to(data2.socketId).emit('won');
                io.to(data1.socketId).emit('lost'); 
            }
            game = null
            players.clear()
        }
    }

    if (!sessionId && players.size >= 2) {
        socket.emit('roomFull', { message: "the room is full..." });
        socket.disconnect();
        return;
    }

    if (!sessionId || !players.has(sessionId)) {
        sessionId = Math.random().toString(36).substring(2, 10);
        socket.emit('session', { sessionId });
        
        players.set(sessionId, { pseudo: pseudo, socketId: socket.id });
        console.log(`player 1 added : ${pseudo}`);
    } else {
        const joueurExistant = players.get(sessionId);
        clearTimeout(minuteursDeconnexion.get(sessionId));
        minuteursDeconnexion.delete(sessionId);
        console.log('reset timer');
        joueurExistant.socketId = socket.id;
    }

    socket.data.sessionId = sessionId;
    if (players.size === 1) {
        socket.emit('wait');
    }

    else if (players.size === 2) {
        if (!game) {
            console.log(Array.from(players));
            
            const inGamePlayers = Array.from(players);
            const id1 = inGamePlayers[0][0];
            const data1 = inGamePlayers[0][1];
            
            console.log(data1);
            
            
            const id2 = inGamePlayers[1][0];
            const data2 = inGamePlayers[1][1];
            console.log(data2)
            
            console.log(`Begining of the game : ${data1.pseudo} VS ${data2.pseudo}`);

            const deck = new Deck()
            const testCards: Card[] = [new Card(1,"diamond"), new Card(3, "spade")]
            const finalDeck = testCards.concat(deck.drawXCards(52-testCards.length))

            game = new GameData(id1, data1.pseudo, id2, data2.pseudo,new Deck([...finalDeck]), new Deck([...finalDeck]));

            io.to(data1.socketId).emit('updateBoard', game.getGameState(id1));
            io.to(data2.socketId).emit('updateBoard', game.getGameState(id2));
        }
        else{
            const inGamePlayers = Array.from(players);
            const data1 = inGamePlayers[0][1];
            const data2 = inGamePlayers[1][1];
            console.log(`Here we go again : ${data1.pseudo} VS ${data2.pseudo}`);
            sendGameState()
        }
    }

    socket.on('playCard', (playRequest: PlayRequest) => {
        try{
            console.log('play request recieved')
            game?.play(sessionId, playRequest.origin, playRequest.destination)
            sendGameState()
            gameWon()
        }
        catch (e){
            socket.emit('moveError', {message: (e as Error).message})
        }
    })

    socket.on('revealDraw', () => {
        try{
            console.log('reveal draw request recieved')
            game?.showDraw(sessionId)
            sendGameState()
        }
        catch (e){
            socket.emit('moveError', {message: (e as Error).message})
        }
    })
    

    socket.on('disconnect', () => {
        const id = socket.data.sessionId; 
        console.log(`player idsconnected : ${id}`);
        
        const timer = setTimeout(() => {
                minuteursDeconnexion.delete(id);

                const inGamePlayers = Array.from(players);
                const id1 = inGamePlayers[0][0];
                const data1 = inGamePlayers[0][1];
                
                const id2 = inGamePlayers[1][0];
                const data2 = inGamePlayers[1][1];

                if (id === id1){
                    io.to(data1.socketId).emit('wonByDefault');
                }
                else{
                    io.to(data2.socketId).emit('wonByDefault');
                }
                game = null
                players.clear()
                console.log(`Player ${id} deleted`);
            }, 100000);
            minuteursDeconnexion.set(id, timer);
        });
        

    });


const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Serveur running on port ${PORT}`);
});