import type { BoardProps } from "../properties/boardProps"
import boardStyles from "../style/boardStyle"
import Aces from "./Aces"
import LeftBoardPiles from "./LeftBoardPiles"

const Board = ({aces, boardPiles}: BoardProps) => {

    return (
        <div style={boardStyles.board}>
            <div style={{...boardStyles.boardPiles}}>
                <LeftBoardPiles leftPiles={[boardPiles[0], boardPiles[1], boardPiles[2], boardPiles[3]]}></LeftBoardPiles>
            </div>
            <div style={{...boardStyles.aces}}>
                <Aces aces={aces}></Aces>
            </div>
            <div style={{...boardStyles.boardPiles}}></div>
        </div>
    )
}

export default Board