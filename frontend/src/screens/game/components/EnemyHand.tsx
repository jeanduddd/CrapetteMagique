import type { HandsProps } from "../properties/handsProps"
import handStyles from "../style/handsStyle"
import cardStyles from "../style/cardStyle"
import type { ZoneName } from "@shared/IPlayCard"
import { useWindowSize } from "../../../screenSize"

const EnemyHand = ({crapette, bin, draw, setDestination}: HandsProps) => {

    const [width, height] = useWindowSize();

    const cardHeight = width > height ? 0.9 * ((height/6)) : 0.9 * (width/6)

    const dragEnd = (where: ZoneName) => {
        setDestination( { zone:where, index: null })
    }
    
    return (
        <div style={{...handStyles.hand, gap: width/20, height: height/6}}>
            {crapette.cardNumber === 0 ? <img onContextMenu={(e) => e.preventDefault()} draggable={false} style={{...cardStyles.card, height:cardHeight}} src={'forbidden_spot.png'}></img> : <img onContextMenu={(e) => e.preventDefault()} draggable={false} onDrop={() => dragEnd("CRAPETTE")} onDragOver={(e) => {e.preventDefault()}} style={{...cardStyles.card, height:cardHeight}} src={`${crapette.cards?.[0].symbol}_${crapette.cards?.[0].value}.png`}></img>}
            {bin.cardNumber === 0 ? <img onContextMenu={(e) => e.preventDefault()} draggable={false} style={{...cardStyles.card, height:cardHeight}} src={'trash_spot.png'}></img> : <img onContextMenu={(e) => e.preventDefault()} draggable={false} onDrop={() => dragEnd("BIN")} onDragOver={(e) => {e.preventDefault()}} style={{...cardStyles.card, height:cardHeight}} src={`${bin.cards?.[0].symbol}_${bin.cards?.[0].value}.png`}></img>}
            {draw.cardNumber === -1 ? <img onContextMenu={(e) => e.preventDefault()} draggable={false} style={{...cardStyles.card, height:cardHeight}} src={'card_back.png'}></img> : draw.cardNumber === 0 ? <img onContextMenu={(e) => e.preventDefault()} draggable={false} style={{...cardStyles.card, height:cardHeight}} src={'empty_spot.png'}></img> : <img onContextMenu={(e) => e.preventDefault()} draggable={false} style={{...cardStyles.card, height:cardHeight}} src={`${draw.cards?.[0].symbol}_${draw.cards?.[0].value}.png`}></img>}
        </div>
    )
}

export default EnemyHand