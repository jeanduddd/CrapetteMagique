import { useState, useEffect } from "react"
import { io, Socket } from "socket.io-client"
import MenuScreen from "./screens/menu/MenuScreen"
import WaitingScreen from "./screens/waiting/WaitingScreen"
import type { CardData, GameState, PileData } from "@shared/IPlayCard"
import FullRoomScreen from "./screens/full/FullRoomScreen"
import WonGameScreen from "./screens/won/WonGameScreen"
import LostGameScreen from "./screens/lost/LostGameScreen"
import DefaultWinGameScreen from "./screens/defaultWin/DefaultWinGameScreen"
import Game from "./screens/game/Game"


function instanciateCard(value: number, symbol: string):CardData{
    const card: CardData = {
        value: value,
        symbol: symbol
    }
    return card
}

function instanciatePileData(nb: number, cards?: CardData[]):PileData{
    const pile: PileData = {
        cardNumber: nb,
        cards: cards
    }
    return pile
}

export default function App(){
    
    const [name, setName] = useState<string | null>(sessionStorage.getItem('pseudo'))
    
    const [socket, setSocket] = useState<Socket | null>(() => {
        const playerId = sessionStorage.getItem('playerId');
        const name = sessionStorage.getItem('pseudo');
        
        if (playerId) {
            return io('http://localhost:3001', { 
                auth: { sessionId: playerId, pseudo: name } 
            });
        }
        return null; 
    });
    
    const draw: PileData = instanciatePileData(-1,[])
    const enemyDraw: PileData = instanciatePileData(-1,[])
    const bin: PileData = instanciatePileData(0,[])
    const enemyBin: PileData = instanciatePileData(0,[])
    const crapette: PileData = instanciatePileData(1,[instanciateCard(3,"heart")])
    const enemyCrapette: PileData = instanciatePileData(1,[instanciateCard(9,"club")])
    const aces: PileData[] = [instanciatePileData(0), instanciatePileData(1,[instanciateCard(1,"spade")]), instanciatePileData(0), instanciatePileData(0), instanciatePileData(1,[instanciateCard(4,"diamond")]), instanciatePileData(0), instanciatePileData(0), instanciatePileData(0)]
    const board: PileData[] = [instanciatePileData(3,[instanciateCard(13,"heart"),instanciateCard(12,"club"),instanciateCard(11,"diamond")]),instanciatePileData(0),instanciatePileData(1,[instanciateCard(3,"heart")]),instanciatePileData(0),instanciatePileData(2,[instanciateCard(3,"spade"), instanciateCard(2,"heart")]),instanciatePileData(0),instanciatePileData(1,[instanciateCard(11,"diamond")]),instanciatePileData(1,[instanciateCard(4,"club")])]
    
    const newGameState: GameState = {
        myTurn: true,
        crapette: crapette,
        enemyCrapette: enemyCrapette,
        bin: bin,
        enemyBin: enemyBin,
        draw: draw,
        enemyDraw: enemyDraw,
        aces:aces,
        board:board
    }
    
    const [gameState, setGameState] = useState<GameState | null>(null); // tester avec newGameState
    
    const [view, setView] = useState<'MENU' | 'WAITING' | 'GAME' |'FULL' | 'WON' | 'LOST' | 'DEFAULT'>(() => {
        return gameState ? 'GAME' : 'MENU';
    });

    const [playerId, setPlayerId] = useState<null | string>(sessionStorage.getItem('playerId'))

    const connectToServer = (playerID: string | null, playerName: string) => {
        sessionStorage.setItem('pseudo', playerName );
        const connection = io('http://localhost:3001', {
            auth: { sessionId: playerID, pseudo: playerName }
        });
        
        setSocket(connection);
    };

    useEffect(() => {
        if (!socket) return;

        socket.on('session', (donnees) => {
            sessionStorage.setItem('playerId', donnees.sessionId);
        });
        
        socket.on('wait', () => {
            setView('WAITING');
        });
        
        socket.on('updateBoard', (etatRecu: GameState) => {           
            setGameState(etatRecu);
            setView('GAME'); 
        });
        
        socket.on('roomFull', () => {           
            setView('FULL');
            sessionStorage.removeItem('playerId')
        });
        
        socket.on('sessionExpired', () => {
            //TODO display error message       
            setView('MENU');
        });
                
        socket.on('moveError', (message: string) => {
            console.log(message);
            //TODO change this to diplay an error in a component (like a chat idk)
        })
        
        socket.on('won', () => {
            setView('WON')
            socket?.disconnect()
            sessionStorage.removeItem('sessionId')
            sessionStorage.removeItem('playerId')
            setName('')
            setPlayerId(null)
        })
        
        socket.on('lost', () => {
            setView('LOST')
            socket?.disconnect()
            sessionStorage.removeItem('sessionId');
            sessionStorage.removeItem('playerId')
            setName(''); 
            setPlayerId(null)
        })

        socket.on('wonByDefault', () => {
            setView('DEFAULT')
            socket?.disconnect()
            sessionStorage.removeItem('sessionId')
            sessionStorage.removeItem('playerId')
            setName('')
            setPlayerId(null)
        })

        return () => {
            socket.off('session');
            socket.off('wait');
            socket.off('updateBoard');
            socket.off('roomFull');
            socket.off('sessionExpired');
            socket.off('moveError');
            socket.off('won');
            socket.off('lost');
            socket.off('wonByDefault');
        };
    }, [socket]);

    const handleClicPlay = () => {
        if (name?.trim() === '' || name === null) return alert("choose a name !");
        setView('WAITING');
        connectToServer(playerId, name); 
    };

    const backToMenuAndDisconnect = () => {
        if (socket){           
            socket.disconnect()
        }
        setSocket(null)
        setView('MENU')
    }
   
    return (
    <>
        {view === 'MENU' && <MenuScreen name={name ?? ''} handleNameChange={setName} handleClick={handleClicPlay}></MenuScreen>}
        {view === 'WAITING' && <WaitingScreen handleCancel={backToMenuAndDisconnect}></WaitingScreen>}
        {view === 'FULL' && <FullRoomScreen backToMenu={backToMenuAndDisconnect}></FullRoomScreen>}
        {view === 'WON' && <WonGameScreen backToMenu={backToMenuAndDisconnect}></WonGameScreen>}
        {view === 'LOST' && <LostGameScreen backToMenu={backToMenuAndDisconnect}></LostGameScreen>}
        {view === 'DEFAULT' && <DefaultWinGameScreen backToMenu={backToMenuAndDisconnect}></DefaultWinGameScreen>}
        {view === 'GAME' && <Game gameState={gameState}></Game>}
    </>
    )
}