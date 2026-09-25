import type { BoardLineProps } from "../properties/boardLineProps"
import BoardLineStyle from "../style/boardLineStyle"
import cardStyles from "../style/cardStyle"

const LeftBoardLine = ({cards, setOrigin, setDestination, myIndex, isOrigin}: BoardLineProps) => {

    
    const dragStart = () => {
        setOrigin({ zone:"BOARD", index: myIndex });
    }
    
    const dragEnd = () => {
        setDestination( { zone:"BOARD", index: myIndex})
    }
    
    if (cards.cardNumber === 0){
        return (
            <div onDrop={dragEnd} onDragOver={(e) => {e.preventDefault()}} style={{...BoardLineStyle.boardLine, display:"flex", flexDirection:'row', justifyContent:'flex-end', alignItems: "center"}}>
                <img draggable={false} style={{...cardStyles.card, display: "flex"}} src={`empty_spot.png`}></img>
            </div>
        )
    }

    const pileData = cards.cards || []

    return (
        <div onDrop={isOrigin ? () => {} : dragEnd} onDragOver={isOrigin? () => {} : (e) => {e.preventDefault()}} style={{...BoardLineStyle.boardLine, display:"flex", flexDirection:'row', justifyContent:'flex-end', alignItems: "center"}}>
            {[...pileData].reverse().map((card, idx) => (
                idx === 0 ? 
                <img draggable="true" onDragStart={dragStart} style={{...cardStyles.card, position: "relative", zIndex: 15-idx,  marginLeft: idx === 0 ? 0 : - 0.9 * (window.innerHeight / 6) + 0.9 * (window.innerHeight / 6) * 0.3 }} key={idx} src={`${card.symbol}_${card.value}.png`}></img>
                :
                <img draggable={false} style={{...cardStyles.card, position: "relative", zIndex: 15-idx,  marginLeft: idx === 0 ? 0 : - 0.9 * (window.innerHeight / 6) + 0.9 * (window.innerHeight / 6) * 0.3 }} key={idx} src={`${card.symbol}_${card.value}.png`}></img>
            ))}
        </div>

    )
}

export default LeftBoardLine