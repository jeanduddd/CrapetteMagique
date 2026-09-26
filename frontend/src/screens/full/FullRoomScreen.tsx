import styles from "./style/fullRoomScreenStyle"
import type { FullRoomScreenProps } from "./properties/fullRoomScreenProps"
import { useWindowSize } from "../../screenSize";

const FullRoomScreen = ({backToMenu}: FullRoomScreenProps) => {

    const [width, height] = useWindowSize();
    
    const TitleFontSize = Math.min(height, width) * 0.06
    const buttonFontSize = Math.min(Math.min(height, width) * 0.04, 14)
    
    return (
        <div style={styles.screen}>
            <div style={styles.menu}>
            <h1 style={{...styles.title, fontSize: TitleFontSize }}>The room is currently full :(</h1>
            <button style={{fontSize:buttonFontSize}} onClick={backToMenu}>Back to menu</button>
            </div>
        </div>
    )

}

export default FullRoomScreen