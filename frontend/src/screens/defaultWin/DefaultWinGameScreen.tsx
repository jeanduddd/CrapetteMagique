import styles from "./style/DefaultWinGameScreenStyle"
import type { DefaultWinGameScreenProps } from "./properties/defaultWinGameScreenProps"
import { useWindowSize } from "../../screenSize";

const DefaultWinGameScreen = ({backToMenu}: DefaultWinGameScreenProps) => {

    const [width, height] = useWindowSize();
    
    const TitleFontSize = Math.min(height, width) * 0.06
    const buttonFontSize = Math.min(Math.min(height, width) * 0.04,14)
    
    return (
        <div style={styles.screen}>
            <div style={styles.menu}>
            <h1 style={{...styles.title, fontSize: TitleFontSize}}>Your apponent ran away... </h1>
            <button style={{fontSize: buttonFontSize}} onClick={backToMenu}>Back to menu</button>
            </div>
        </div>
    )

}

export default DefaultWinGameScreen