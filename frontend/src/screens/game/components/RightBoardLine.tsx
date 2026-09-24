import type { BoardLineProps } from "../properties/boardLineProps"
import BoardLineStyle from "../style/boardLineStyle"
import cardStyles from "../style/cardStyle"

const RightBoardLine = ({cards}: BoardLineProps) => {

    if (cards.cardNumber === 0){
        return (
            <div style={{...BoardLineStyle.boardLine, display:"flex", flexDirection:'row', justifyContent:'flex-start', alignItems: "center"}}>
                <img style={{...cardStyles.card, display: "flex"}} src={`card_back.png`}></img>
            </div>
        )
    }

    const pileData = cards.cards || []

    return (
        <div style={{...BoardLineStyle.boardLine, display:"flex", flexDirection:'row', justifyContent:'flex-start', alignItems: "center"}}>
            {pileData.map((card, idx) => (
                <img style={{...cardStyles.card, position: "relative", zIndex: idx,  marginLeft: idx === 0 ? 0 : - 0.9 * (window.innerHeight / 6) + 0.9 * (window.innerHeight / 6) * 0.3 }} key={idx} src={`${card.symbol}_${card.value}.png`}></img>
            ))}

        </div>
    )
}

export default RightBoardLine