import type { BackToMenuProps } from "../properties/backToMenuProps";
import styles from "../style/waitingScreenStyle";
import { useWindowSize } from "../../../screenSize";

const BackToMenu = ({ handleCancel }: BackToMenuProps) => {

    const [width, height] = useWindowSize();
    
    const TextFontSize = Math.min(Math.min(height, width) * 0.03, 18)
    const buttonVertPadding = Math.min( height * 0.015 , 10)
    const buttonHorPadding = Math.min( width * 0.01 , 20)
    
  return (
    <button
      onClick={handleCancel}
      style={{...styles.backButton, fontSize: TextFontSize, padding: `${buttonVertPadding}px ${buttonHorPadding}px`}}
    >
      x
    </button>
  );
};

export default BackToMenu;
