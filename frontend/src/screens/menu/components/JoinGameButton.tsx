import type { JoinGameButtonProps } from "../properties/joinGameButtonProps"

const JoinGameButton = ({handleClick}: JoinGameButtonProps) => {
    return (
        <button onClick={handleClick}>Find an apponent</button>
    )
}

export default JoinGameButton