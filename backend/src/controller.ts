import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { PlayRequest } from "@shared/IPlayCard";
import { Card } from "./model/cards/card";
import { Deck } from "./model/cards/cardCollection";
import { GameData } from "./model/GameData";
import * as dotenv from 'dotenv'
import path from "node:path";

dotenv.config()
const app = express();
const server = createServer(app);

const distPath = path.join(__dirname, 'dist')
app.use(express.static(distPath))

const io = new Server(server, {
  cors: { origin: "*" },
});

app.get("/", (req, res) => {
  res.send("<h1>Serveur Crapette Opérationnel</h1>");
});

const players = new Map();
let game: GameData | null = null;
const disconnectionTimer = new Map();

io.on("connection", (socket) => {
  let sessionId = socket.handshake.auth.sessionId;
  const pseudo = socket.handshake.auth.pseudo;

  const sendGameState = () => {
    console.log("send state");

    const inGamePlayers = Array.from(players);
    const id1 = inGamePlayers[0][0];
    const data1 = inGamePlayers[0][1];

    const id2 = inGamePlayers[1][0];
    const data2 = inGamePlayers[1][1];

    io.to(data1.socketId).emit("updateBoard", game?.getGameState(id1));
    io.to(data2.socketId).emit("updateBoard", game?.getGameState(id2));
  };

  const gameWon = () => {
    const won = game?.getStatus();
    if (won === "won") {
      const winnerId = game?.getWinnerId();
      if (winnerId === null) {
        throw new Error(
          "Uh, its not normal... No winner id even if someone won the game...",
        );
      }
      const timerId = setTimeout(() => {}, 1000);
      const inGamePlayers = Array.from(players);
      const id1 = inGamePlayers[0][0];
      const data1 = inGamePlayers[0][1];

      const id2 = inGamePlayers[1][0];
      const data2 = inGamePlayers[1][1];

      if (winnerId === id1) {
        io.to(data1.socketId).emit("won");
        io.to(data2.socketId).emit("lost");
      } else {
        io.to(data2.socketId).emit("won");
        io.to(data1.socketId).emit("lost");
      }
      game = null;
      players.clear();
      //faut reset le nom de session chez le client ??? pas besoin non?
      //pcq ca check si c dans la liste des joueurs... par contre...
      //qd ca sera les +ieurs games, faudra reset au cas ou je pense
    }
  };

  if (!sessionId && players.size >= 2) {
    socket.emit("roomFull", { message: "the room is full..." });
    socket.disconnect();
    return;
  }

  if (!sessionId || !players.has(sessionId)) {
    sessionId = Math.random().toString(36).substring(2, 10);
    socket.emit("session", { sessionId });

    players.set(sessionId, { pseudo: pseudo, socketId: socket.id });
    console.log(`player 1 added : ${pseudo}`);
  } else {
    const existingPlayer = players.get(sessionId);

    if (!existingPlayer) {
      console.log(`player ${sessionId} does not exist`);
      socket.emit("sessionExpired");
      return;
    }
    if (disconnectionTimer.has(sessionId)) {
      clearTimeout(disconnectionTimer.get(sessionId));
      disconnectionTimer.delete(sessionId);
      console.log(`reset timer:  ${sessionId}`);
    }
    existingPlayer.socketId = socket.id;
    if (game) {
      socket.emit("updateBoard", game.getGameState(sessionId));
    } else {
      socket.emit("sessionExpired");
    }
  }

  socket.data.sessionId = sessionId;
  if (players.size === 1) {
    socket.emit("wait");
  } else if (players.size === 2) {
    if (!game) {
      console.log(Array.from(players));

      const inGamePlayers = Array.from(players);
      const id1 = inGamePlayers[0][0];
      const data1 = inGamePlayers[0][1];

      console.log(data1);

      const id2 = inGamePlayers[1][0];
      const data2 = inGamePlayers[1][1];
      console.log(data2);

      console.log(`Begining of the game : ${data1.pseudo} VS ${data2.pseudo}`);

      const deck = new Deck();
      const testCards: Card[] = [new Card(1, "diamond"), new Card(3, "spade")];
      const finalDeck = testCards.concat(
        deck.drawXCards(52 - testCards.length),
      );

      game = new GameData(
        id1,
        data1.pseudo,
        id2,
        data2.pseudo,
        new Deck([...finalDeck]),
        new Deck([...finalDeck]),
      );

      io.to(data1.socketId).emit("updateBoard", game.getGameState(id1));
      io.to(data2.socketId).emit("updateBoard", game.getGameState(id2));
    } else {
      try {
        const inGamePlayers = Array.from(players);
        const data1 = inGamePlayers[0][1];
        const data2 = inGamePlayers[1][1];
        console.log(`Here we go again : ${data1.pseudo} VS ${data2.pseudo}`);
        sendGameState();
      } catch (e) {
        socket.emit("moveError", { message: (e as Error).message });
      }
    }
  }

  socket.on("playCard", (playRequest: PlayRequest) => {
    try {
      console.log("play request recieved");
      game?.play(sessionId, playRequest.origin, playRequest.destination);
      sendGameState();
      gameWon();
    } catch (e) {
      socket.emit("moveError", { message: (e as Error).message });
    }
  });

  socket.on("revealDraw", () => {
    try {
      console.log("reveal draw request recieved");
      game?.showDraw(sessionId);
      sendGameState();
    } catch (e) {
      socket.emit("moveError", { message: (e as Error).message });
    }
  });

  socket.on("disconnect", () => {
    const id = socket.data.sessionId;
    console.log(`player disconnected : ${id}`);

    if (disconnectionTimer.has(id)) {
      clearTimeout(disconnectionTimer.get(id));
      console.log(`Ancien minuteur annulé pour ${id}`);
    }

    const timer = setTimeout(() => {
      disconnectionTimer.delete(id);

      if (!players.has(id)) return;

      if (players.size === 2) {
        const inGamePlayers = Array.from(players);
        const [id1, data1] = inGamePlayers[0];
        const [id2, data2] = inGamePlayers[1];

        if (id === id1) io.to(data2.socketId).emit("wonByDefault");
        else if (id === id2) io.to(data1.socketId).emit("wonByDefault");
      }

      game = null;
      players.clear();
      console.log(`${id} abandonned`);
    }, 100000);
    if (game) {
      disconnectionTimer.set(id, timer);
    } else {
      players.delete(id);
    }
    //mettre un chrono, si la personne revient pas apres 1min,
    //suppr la game et envoyer au boug qu'il a gagné
    //si les 2 sont déco suppr d'un coup?? peut etre pas... siya eu une coupure.
    //Et puis le bus final c de faire +ieurs games en parallèle donc pas besoin de liberer le serveur
  });
});

const PORT = process.env.PORT
server.listen(PORT, () => {
  console.log(`Serveur running on port ${PORT}`);
});
