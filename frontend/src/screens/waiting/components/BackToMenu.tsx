import type { BackToMenuProps } from "../properties/backToMenuProps";
import styles from "../style/waitingScreenStyle";

const BackToMenu = ({ handleCancel }: BackToMenuProps) => {
  return (
    <button
      onClick={handleCancel}
      style={styles.backButton}
    >
      x
    </button>
  );
};

export default BackToMenu;
