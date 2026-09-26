import styles from "./style/wonGameScreenStyle"
import type { WonGameScreenProps } from "./properties/wonGameScreenProps"
import { useWindowSize } from "../../screenSize";

const WonGameScreen = ({backToMenu}: WonGameScreenProps) => {

    const [width, height] = useWindowSize();
    
    const TitleFontSize = Math.min(height, width) * 0.06
    const buttonFontSize = Math.min(Math.min(height, width) * 0.04,14)
    

    return (
        <div style={styles.screen}>
            <div style={styles.menu}>
            <h1 style={{...styles.title, fontSize: TitleFontSize}}>You won the game! YIPEEEEE</h1>
            <button style={{fontSize:buttonFontSize}} onClick={backToMenu}>Back to menu</button>
            </div>
        </div>
    )

}

export default WonGameScreen