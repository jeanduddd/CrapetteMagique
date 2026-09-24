import type { BoardPilesProps } from "../properties/boardPilesProps"
import boardPilesStyles from "../style/boardPilesStyle"
import GameStyles from "../style/GameScreenStyle"
import LeftBoardLine from "./LeftBoardLine"

const LeftBoardPiles = ({leftPiles}: BoardPilesProps) => {
    return (
        <div style={{...boardPilesStyles.boardPiles, ...GameStyles.border}}>
            {leftPiles.map( (pile, idx) => 
                <div key={idx} style={{...boardPilesStyles.boardPile, ...GameStyles.border}}>
                <LeftBoardLine cards={pile}></LeftBoardLine>
            </div>
            )}
        </div>
    )
}

export default LeftBoardPiles