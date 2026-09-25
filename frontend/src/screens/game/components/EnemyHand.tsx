import type { HandsProps } from "../properties/handsProps"
import handStyles from "../style/handsStyle"
import cardStyles from "../style/cardStyle"
import type { ZoneName } from "@shared/IPlayCard"

const EnemyHand = ({crapette, bin, draw, setDestination}: HandsProps) => {

    const dragEnd = (where: ZoneName) => {
        setDestination( { zone:where, index: null })
    }
    
    return (
        <div style={{...handStyles.hand}}>
            {crapette.cardNumber === 0 ? <img draggable={false} style={cardStyles.card} src={'forbidden_spot.png'}></img> : <img draggable={false} onDrop={() => dragEnd("CRAPETTE")} onDragOver={(e) => {e.preventDefault()}} style={cardStyles.card} src={`${crapette.cards?.[0].symbol}_${crapette.cards?.[0].value}.png`}></img>}
            {bin.cardNumber === 0 ? <img draggable={false} style={cardStyles.card} src={'trash_spot.png'}></img> : <img draggable={false} onDrop={() => dragEnd("BIN")} onDragOver={(e) => {e.preventDefault()}} style={cardStyles.card} src={`${bin.cards?.[0].symbol}_${bin.cards?.[0].value}.png`}></img>}
            {draw.cardNumber === -1 ? <img draggable={false} style={cardStyles.card} src={'card_back.png'}></img> : draw.cardNumber === 0 ? <img draggable={false} style={cardStyles.card} src={'empty_spot.png'}></img> : <img draggable={false} style={cardStyles.card} src={`${draw.cards?.[0].symbol}_${draw.cards?.[0].value}.png`}></img>}
        </div>
    )
}

export default EnemyHand