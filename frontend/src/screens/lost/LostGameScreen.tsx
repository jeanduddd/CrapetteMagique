import styles from "./style/lostGameScreenStyle"
import type { LostGameScreenProps } from "./properties/lostGameScreenProps"
import { useWindowSize } from "../../screenSize";

const LostGameScreen = ({backToMenu}: LostGameScreenProps) => {

    const [width, height] = useWindowSize();
    
    const TitleFontSize = Math.min(height, width) * 0.06
    const buttonFontSize = Math.min(Math.min(height, width) * 0.04, 14)
    
    return (
        <div style={styles.screen}>
            <div style={styles.menu}>
            <h1 style={{...styles.title, fontSize: TitleFontSize}}>oh no... ya lost da game :/</h1>
            <button style={{fontSize: buttonFontSize}} onClick={backToMenu}>Back to menu</button>
            </div>
        </div>
    )

}

export default LostGameScreen