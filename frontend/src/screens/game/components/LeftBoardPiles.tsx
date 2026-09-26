import type { BoardPilesProps } from "../properties/boardPilesProps"
import boardPilesStyles from "../style/boardPilesStyle"
import LeftBoardLine from "./LeftBoardLine"
import { useWindowSize } from "../../../screenSize"

const LeftBoardPiles = ({leftPiles, setOrigin, setDestination, origin}: BoardPilesProps) => {

    const [width, height] = useWindowSize();

    return (
        <div style={{...boardPilesStyles.boardPiles, width: (width/8) * 3, height: (height/6) * 4}}>
            {leftPiles?.map( (pile, idx) => 
                <div key={idx} style={{...boardPilesStyles.boardPile, width: (width/8) * 3, height: (height/6)}}>
                    <LeftBoardLine isOrigin={origin !== null && origin.zone === "BOARD" && origin.index === idx} cards={pile} myIndex={idx} setOrigin={setOrigin} setDestination={setDestination}></LeftBoardLine>
                </div>
            )}
        </div>
    )
}

export default LeftBoardPiles