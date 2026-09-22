import { useState } from "react"
import { io, Socket } from "socket.io-client"
import MenuScreen from "./screens/menu/MenuScreen"
import WaitingScreen from "./screens/waiting/WaitingScreen"
import type { GameState } from "@shared/IPlayCard"
import FullRoomScreen from "./screens/full/FullRoomScreen"
import WonGameScreen from "./screens/won/WonGameScreen"
import LostGameScreen from "./screens/lost/LostGameScreen"
import DefaultWinGameScreen from "./screens/defaultWin/DefaultWinGameScreen"
import Game from "./screens/game/Game"

export default function App(){
    const [view, setView] = useState<'MENU' | 'WAITING' | 'GAME' |'FULL' | 'WON' | 'LOST' | 'DEFAULT'>('MENU')

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

    // const backToMenuRoomFull = () => {
    //     setView('MENU')
    // }

    const backToMenuAndDisconnect = () => {
        if (socket){
            socket.disconnect()
        }
        setSocket(null)
        setView('MENU')
    }

    return (
    <>
        {view === 'MENU' && <MenuScreen name={name} handleNameChange={setName} handleClick={handleClicPlay}></MenuScreen>}
        {view === 'WAITING' && <WaitingScreen handleCancel={backToMenuAndDisconnect}></WaitingScreen>}
        {view === 'FULL' && <FullRoomScreen backToMenu={backToMenuAndDisconnect}></FullRoomScreen>}
        {view === 'WON' && <WonGameScreen backToMenu={backToMenuAndDisconnect}></WonGameScreen>}
        {view === 'LOST' && <LostGameScreen backToMenu={backToMenuAndDisconnect}></LostGameScreen>}
        {view === 'DEFAULT' && <DefaultWinGameScreen backToMenu={backToMenuAndDisconnect}></DefaultWinGameScreen>}
        {view === 'GAME' && <Game gameState={gameState}></Game>}
    </>
    )
}