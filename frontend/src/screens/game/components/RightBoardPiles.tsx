import type { BoardPilesProps } from "../properties/boardPilesProps"
import boardPilesStyles from "../style/boardPilesStyle"
import RightBoardLine from "./RightBoardLine"

const RightBoardPiles = ({rightPiles, setOrigin, setDestination, origin}: BoardPilesProps) => {
    return (
        <div style={{...boardPilesStyles.boardPiles}}>
            {rightPiles?.map( (pile, idx) => 
                <div key={idx} style={{...boardPilesStyles.boardPile}}>
                <RightBoardLine isOrigin={origin !== null && origin.zone === "BOARD" && origin.index === idx + 4} cards={pile} setOrigin={setOrigin} myIndex={idx+4} setDestination={setDestination}></RightBoardLine>
            </div>
            )}
        </div>
    )
}

export default RightBoardPiles