import type { BoardPilesProps } from "../properties/boardPilesProps"
import boardPilesStyles from "../style/boardPilesStyle"
import LeftBoardLine from "./LeftBoardLine"

const LeftBoardPiles = ({leftPiles, setOrigin, setDestination, origin}: BoardPilesProps) => {

    return (
        <div style={{...boardPilesStyles.boardPiles}}>
            {leftPiles?.map( (pile, idx) => 
                <div key={idx} style={{...boardPilesStyles.boardPile}}>
                <LeftBoardLine isOrigin={origin !== null && origin.zone === "BOARD" && origin.index === idx} cards={pile} myIndex={idx} setOrigin={setOrigin} setDestination={setDestination}></LeftBoardLine>
            </div>
            )}
        </div>
    )
}

export default LeftBoardPiles