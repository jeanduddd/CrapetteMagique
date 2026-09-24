import type { BoardProps } from "../properties/boardProps"
import boardStyles from "../style/boardStyle"
import Aces from "./Aces"
import LeftBoardPiles from "./LeftBoardPiles"
import RightBoardPiles from "./RightBoardPiles"

const Board = ({aces, boardPiles}: BoardProps) => {

    return (
        <div style={boardStyles.board}>
            <div style={{...boardStyles.boardPiles}}>
                <LeftBoardPiles leftPiles={[boardPiles[0], boardPiles[1], boardPiles[2], boardPiles[3]]}></LeftBoardPiles>
            </div>
            <div style={{...boardStyles.aces}}>
                <Aces aces={aces}></Aces>
            </div>
            <div style={{...boardStyles.boardPiles}}>
                <RightBoardPiles rightPiles={[boardPiles[4], boardPiles[5], boardPiles[6], boardPiles[7]]}></RightBoardPiles>
            </div>
        </div>
    )
}

export default Board