import EnemyHand from "./components/EnemyHand"
import MyHand from "./components/MyHand"
import type { GameProps } from "./properties/gameProps"
import styles from "./style/GameScreenStyle"
import Board from "./components/Board"
import GameStyles from "./style/GameScreenStyle"

const Game = ({gameState, setOrigin, setDestination, origin, revealDraw} : GameProps) => {

    //haut, bas, cartes à gauche, as, cartes à droite

    if (gameState === null){
        return <p>uh there is a pb...</p>
    }

    const handSize = window.innerHeight/6
    const boardSize = (window.innerWidth/6) * 4

    return (
        <div style={styles.screen}>
            <div style={{height: handSize, width: '100vw', ...GameStyles.border}}>
                <EnemyHand revealDraw={revealDraw} setOrigin={setOrigin} setDestination={setDestination} crapette={gameState.enemyCrapette} bin={gameState.enemyBin} draw={gameState.enemyDraw}></EnemyHand>
            </div>
            <div style={{height: boardSize, width: '100vw', ...GameStyles.border}}>
                <Board origin={origin} setOrigin={setOrigin} setDestination={setDestination} aces={gameState.aces} boardPiles={gameState.board}></Board>
            </div>
            <div style={{height: handSize, width: '100vw', ...GameStyles.border}}>
                <MyHand revealDraw={revealDraw} setOrigin={setOrigin} setDestination={setDestination} crapette={gameState.crapette} bin={gameState.bin} draw={gameState.draw}></MyHand> 
            </div>
        </div>
    )
}

export default Game