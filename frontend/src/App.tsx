import { useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { type GameState } from '@shared/IPlayCard';

export default function App() {
    const [vueCourante, setVueCourante] = useState<'MENU' | 'RECHERCHE' | 'JEU'>('MENU');
    
    const [socket, setSocket] = useState<Socket | null>(null);
    const [gameState, setGameState] = useState<GameState | null>(null);

    const lancerLaPartie = () => {
        setVueCourante('RECHERCHE');
        
        const connexion = io('http://localhost:3001');
        setSocket(connexion);

        connexion.on('maj_plateau', (etatRecu: GameState) => {
            setGameState(etatRecu);
            setVueCourante('JEU');
        });
    };

    return (
        <main className="app-container">
            {vueCourante === 'MENU' && (
                <div className="menu">
                    <h1>Crapette Magique</h1>
                    <button onClick={lancerLaPartie}>Jouer en ligne</button>
                </div>
            )}

            {vueCourante === 'RECHERCHE' && (
                <div className="chargement">
                    <p>Connexion au serveur en cours...</p>
                    <span className="spinner">🔄</span>
                </div>
            )}

            {vueCourante === 'JEU' && gameState && socket && (
                <></>
            )}
        </main>
    );
}