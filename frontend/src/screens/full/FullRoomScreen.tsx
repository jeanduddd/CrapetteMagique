import styles from "./style/fullRoomScreenStyle"
import type { FullRoomScreenProps } from "./properties/fullRoomScreenProps"

const FullRoomScreen = ({backToMenu}: FullRoomScreenProps) => {
    return (
        <div style={styles.screen}>
            <div style={styles.menu}>
            <h1 style={styles.title}>The room is currently full :(</h1>
            <button onClick={backToMenu}>Back to menu</button>
            </div>
        </div>
    )

}

export default FullRoomScreen