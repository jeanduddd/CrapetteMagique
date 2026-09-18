import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: { origin: "*" }
});

app.get('/', (req, res) => {
    res.send('<h1>Serveur Crapette Opérationnel</h1>');
});

io.on('connection', (socket) => {
    console.log(`Nouveau joueur connecté : ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Joueur déconnecté : ${socket.id}`);
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Serveur running on port ${PORT}`);
});