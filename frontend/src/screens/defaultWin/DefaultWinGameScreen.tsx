import styles from "./style/DefaultWinGameScreenStyle"
import type { DefaultWinGameScreenProps } from "./properties/defaultWinGameScreenProps"

const DefaultWinGameScreen = ({backToMenu}: DefaultWinGameScreenProps) => {
    return (
        <div style={styles.screen}>
            <div style={styles.menu}>
            <h1 style={styles.title}>Your apponent ran away... </h1>
            <button onClick={backToMenu}>Back to menu</button>
            </div>
        </div>
    )

}

export default DefaultWinGameScreen