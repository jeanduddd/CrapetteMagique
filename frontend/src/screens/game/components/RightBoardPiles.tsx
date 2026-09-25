import type { BoardPilesProps } from "../properties/boardPilesProps"
import boardPilesStyles from "../style/boardPilesStyle"
import GameStyles from "../style/GameScreenStyle"
import RightBoardLine from "./RightBoardLine"

const RightBoardPiles = ({rightPiles, setOrigin, setDestination}: BoardPilesProps) => {
    return (
        <div style={{...boardPilesStyles.boardPiles, ...GameStyles.border}}>
            {rightPiles?.map( (pile, idx) => 
                <div key={idx} style={{...boardPilesStyles.boardPile, ...GameStyles.border}}>
                <RightBoardLine cards={pile} setOrigin={setOrigin} myIndex={idx+4} setDestination={setDestination}></RightBoardLine>
            </div>
            )}
        </div>
    )
}

export default RightBoardPiles