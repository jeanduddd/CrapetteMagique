import type { BoardPilesProps } from "../properties/boardPilesProps"
import boardPilesStyles from "../style/boardPilesStyle"
import GameStyles from "../style/GameScreenStyle"
import RightBoardLine from "./RightBoardLine"

const RightBoardPiles = ({rightPiles}: BoardPilesProps) => {
    return (
        <div style={{...boardPilesStyles.boardPiles, ...GameStyles.border}}>
            {rightPiles?.map( (pile, idx) => 
                <div key={idx} style={{...boardPilesStyles.boardPile, ...GameStyles.border}}>
                <RightBoardLine cards={pile}></RightBoardLine>
            </div>
            )}
        </div>
    )
}

export default RightBoardPiles