import type { JoinGameButtonProps } from "../properties/joinGameButtonProps"
import { useWindowSize } from "../../../screenSize";

const JoinGameButton = ({handleClick}: JoinGameButtonProps) => {

    const [width, height] = useWindowSize();
    
    const buttonFontSize = Math.min(Math.min(height, width) * 0.04, 14)

    return (
        <button style={{fontSize: buttonFontSize}} onClick={handleClick}>Find an apponent</button>
    )
}

export default JoinGameButton