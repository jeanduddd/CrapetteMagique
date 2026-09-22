import styles from "./style/wonGameScreenStyle"
import type { WonGameScreenProps } from "./properties/wonGameScreenProps"

const WonGameScreen = ({backToMenu}: WonGameScreenProps) => {
    return (
        <div style={styles.screen}>
            <div style={styles.menu}>
            <h1 style={styles.title}>You won the game! YIPEEEEE</h1>
            <button onClick={backToMenu}>Back to menu</button>
            </div>
        </div>
    )

}

export default WonGameScreen