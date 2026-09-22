import styles from "./style/lostGameScreenStyle"
import type { LostGameScreenProps } from "./properties/lostGameScreenProps"

const LostGameScreen = ({backToMenu}: LostGameScreenProps) => {
    return (
        <div style={styles.screen}>
            <div style={styles.menu}>
            <h1 style={styles.title}>oh no... ya lost da game :/</h1>
            <button onClick={backToMenu}>Back to menu</button>
            </div>
        </div>
    )

}

export default LostGameScreen