import BackToMenu from "./components/BackToMenu";
import styles from "./style/waitingScreenStyle";
import type { WaitingScreenProps } from "./properties/waitingScreenProps";

const WaitingScreen = ({handleCancel}: WaitingScreenProps) => {
  return (
    <div style={styles.screen}>
        <div style={styles.backButtonDisplay}>
      <BackToMenu handleCancel={handleCancel}></BackToMenu>
      </div>
      <div style={styles.menu}>
        <h1 style={styles.title}>Waiting for an apponent...</h1>
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
          <circle cx="12" cy="12" r="10" />
        </svg>
      </div>
    </div>
  );
};

export default WaitingScreen;
