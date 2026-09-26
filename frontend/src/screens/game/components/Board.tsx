import type { BoardProps } from "../properties/boardProps"
import boardStyles from "../style/boardStyle"
import Aces from "./Aces"
import LeftBoardPiles from "./LeftBoardPiles"
import RightBoardPiles from "./RightBoardPiles"
import { useWindowSize } from "../../../screenSize"

const Board = ({aces, boardPiles, setOrigin, setDestination, origin}: BoardProps) => {

    const [width, height] = useWindowSize();

    return (
        <div style={boardStyles.board}>
            <div style={{...boardStyles.boardPiles, width: (width/8) * 3, height: (height/6) * 4}}>
                <LeftBoardPiles origin={origin} setOrigin={setOrigin} setDestination={setDestination} leftPiles={[boardPiles[0], boardPiles[1], boardPiles[2], boardPiles[3]]}></LeftBoardPiles>
            </div>
            <div style={{...boardStyles.aces, width: width/4, height: (height/6) * 4}}>
                <Aces setDestination={setDestination} aces={aces}></Aces>
            </div>
            <div style={{...boardStyles.boardPiles, width: (width/8) * 3, height: (height/6) * 4}}>
                <RightBoardPiles origin={origin} setOrigin={setOrigin} setDestination={setDestination} rightPiles={[boardPiles[4], boardPiles[5], boardPiles[6], boardPiles[7]]}></RightBoardPiles>
            </div>
        </div>
    )
}

export default Board