import type { AceLineProps } from "../properties/aceLineProps"
import aceLineStyle from "../style/aceLineStyle"
import cardStyles from "../style/cardStyle"
import GameStyles from "../style/GameScreenStyle"

const AceLine = ({firstAce, secondAce, setDestination, indexes}: AceLineProps) => {

    const dragEnd = (idx: number) => {
        setDestination( { zone:"ACE", index: idx})
    }

    return (
        <div style={{...aceLineStyle.aceLine, ...GameStyles.border}}>
            <img draggable={false} onDrop={() => dragEnd(indexes[0])} onDragOver={(e) => {e.preventDefault()}} style={cardStyles.card} src={firstAce.cardNumber === 0 ? "empty_spot.png" : `${firstAce.cards?.[0].symbol}_${firstAce.cards?.[0].value}.png`}></img>
            <img draggable={false} onDrop={() => dragEnd(indexes[1])} onDragOver={(e) => {e.preventDefault()}} style={cardStyles.card} src={secondAce.cardNumber === 0 ? "empty_spot.png" : `${secondAce.cards?.[0].symbol}_${secondAce.cards?.[0].value}.png`}></img>
        </div>
    )
}

export default AceLine