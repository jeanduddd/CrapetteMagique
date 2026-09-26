import BackToMenu from "./components/BackToMenu";
import styles from "./style/waitingScreenStyle";
import type { WaitingScreenProps } from "./properties/waitingScreenProps";
import { useWindowSize } from "../../screenSize";

const WaitingScreen = ({ handleCancel }: WaitingScreenProps) => {
  const [width, height] = useWindowSize();

  const TitleFontSize = Math.min(height, width) * 0.06;
  const wheelRadius = Math.min(Math.min(height, width) * 0.016, 10);
  console.log(wheelRadius);
  

  return (
    <div style={styles.screen}>
      <div style={styles.backButtonDisplay}>
        <BackToMenu handleCancel={handleCancel}></BackToMenu>
      </div>
      <div style={styles.menu}>
        <h1 style={{...styles.title, fontSize: TitleFontSize}}>Waiting for an apponent...</h1>
        <svg
          className="loader"
          width={10}
          height={10}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r={wheelRadius} />
        </svg>
      </div>
    </div>
  );
};

export default WaitingScreen;
