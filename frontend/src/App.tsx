import { useState } from "react"
import { io, Socket } from "socket.io-client"
import MenuScreen from "./screens/menu/MenuScreen"
import WaitingScreen from "./screens/waiting/WaitingScreen"
import type { GameState } from "@shared/IPlayCard"

export default function App(){
    const [view, setView] = useState<'MENU' | 'WAITING' | 'GAME' |'FULL' | 'WON' | 'LOST'>('MENU')

    const [name, setName] = useState('')

    const [socket, setSocket] = useState<Socket | null>(null);

    const [gameState, setGameState] = useState<GameState | null>(null);

    const connectToServer = (playerID: string | null, playerName: string) => {
        const connection = io('http://localhost:3001', {
            auth: { sessionId: playerID, pseudo: playerName }
        });
        
        setSocket(connection);

        connection.on('session', (donnees) => {
            sessionStorage.setItem('joueurId', donnees.sessionId);
        });

        connection.on('wait', () => {
            setView('WAITING');
        });

        connection.on('updateBoard', (etatRecu: GameState) => {
            setGameState(etatRecu);
            setView('GAME'); 
        });

        connection.on('roomFull', () => {           
            setView('FULL'); 
        });

        connection.on('moveError', (message: string) => {
            console.log(message);
            //TODO change this to diplay an error in a component (like a chat idk)
        })
    };

    const handleClicPlay = () => {
        if (name.trim() === '') return alert("choose a name !");
        setView('WAITING');
        connectToServer(null, name); 
    };

    return (
    <>
        {view === 'MENU' && <MenuScreen name={name} handleNameChange={setName} handleClick={handleClicPlay}></MenuScreen>}
        {view === 'WAITING' && <WaitingScreen></WaitingScreen>}
    </>
    )
}