import type { BoardPilesProps } from "../properties/boardPilesProps"
import boardPilesStyles from "../style/boardPilesStyle"
import GameStyles from "../style/GameScreenStyle"
import LeftBoardLine from "./LeftBoardLine"

const LeftBoardPiles = ({leftPiles, setOrigin, setDestination, origin}: BoardPilesProps) => {

    return (
        <div style={{...boardPilesStyles.boardPiles, ...GameStyles.border}}>
            {leftPiles?.map( (pile, idx) => 
                <div key={idx} style={{...boardPilesStyles.boardPile, ...GameStyles.border}}>
                <LeftBoardLine isOrigin={origin !== null && origin.zone === "BOARD" && origin.index === idx} cards={pile} myIndex={idx} setOrigin={setOrigin} setDestination={setDestination}></LeftBoardLine>
            </div>
            )}
        </div>
    )
}

export default LeftBoardPiles