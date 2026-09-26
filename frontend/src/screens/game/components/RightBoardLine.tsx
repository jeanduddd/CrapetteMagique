import type { BoardLineProps } from "../properties/boardLineProps"
import BoardLineStyle from "../style/boardLineStyle"
import cardStyles from "../style/cardStyle"
import { useWindowSize } from "../../../screenSize"

const RightBoardLine = ({cards, setOrigin, setDestination, myIndex, isOrigin}: BoardLineProps) => {

    const [width, height] = useWindowSize();

    const cardHeight = width > height ? 0.9 * ((height/6)) : 0.9 * (width/6)

    let cardGap = - cardHeight + cardHeight * 0.3

    const cardPileLength = (cards.cardNumber * cardHeight * 0.3) + (cardHeight * 0.7)
    if ( cardPileLength >= ((width / 8) * 3)){
        cardGap = - cardHeight + (((width / 8) * 3) - (0.7 * cardHeight)) / (cards.cardNumber)
    }

    const dragStart = () => {
        setOrigin({ zone:"BOARD", index: myIndex });
    }
    
    const dragEnd = () => {
        setDestination( { zone:"BOARD", index: myIndex})
    }
    
    if (cards.cardNumber === 0){
        return (
            <div onDrop={dragEnd} onDragEnter={(e) => e.preventDefault()} onDragOver={(e) => {e.preventDefault()}} style={{...BoardLineStyle.boardLine, width: (width/8) * 3, height: (height/6), display:"flex", flexDirection:'row', justifyContent:'flex-start', alignItems: "center"}}>
                <img onContextMenu={(e) => e.preventDefault()} draggable={false} style={{...cardStyles.card, height: cardHeight, display: "flex"}} src={`empty_spot.png`}></img>
            </div>
        )
    }

    const pileData = cards.cards || []
    const maxId = pileData.length - 1

    return (
        <div onDrop={isOrigin ? () => {} : dragEnd} onDragEnter={(e) => e.preventDefault()} onDragOver={isOrigin? () => {} : (e) => {e.preventDefault()}} style={{...BoardLineStyle.boardLine, width: (width/8) * 3, height: (height/6), display:"flex", flexDirection:'row', justifyContent:'flex-start', alignItems: "center"}}>
            {pileData.map((card, idx) => (
                idx === maxId ? 
                <img onContextMenu={(e) => e.preventDefault()} draggable="true" onDragStart={dragStart} style={{...cardStyles.card, height: cardHeight, position: "relative", zIndex: idx,  marginLeft: idx === 0 ? 0 : cardGap }} key={idx} src={`${card.symbol}_${card.value}.png`}></img>
                :
                <img onContextMenu={(e) => e.preventDefault()} draggable={false} style={{...cardStyles.card, height: cardHeight, position: "relative", zIndex: idx,  marginLeft: idx === 0 ? 0 : cardGap }} key={idx} src={`${card.symbol}_${card.value}.png`}></img>
            ))}

        </div>
    )
}

export default RightBoardLine