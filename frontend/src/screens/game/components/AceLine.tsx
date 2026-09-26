import type { AceLineProps } from "../properties/aceLineProps"
import aceLineStyle from "../style/aceLineStyle"
import cardStyles from "../style/cardStyle"
import { useWindowSize } from "../../../screenSize"

const AceLine = ({firstAce, secondAce, setDestination, indexes}: AceLineProps) => {

    const [width, height] = useWindowSize();

    const cardHeight = width > height ? 0.9 * ((height/6)) : 0.9 * (width/6)

    const dragEnd = (idx: number) => {
        setDestination( { zone:"ACE", index: idx})
    }

    return (
        <div style={{...aceLineStyle.aceLine, width: width/4, height: (height/6), gap: (width/4) / 10}}>
            <img onContextMenu={(e) => e.preventDefault()} draggable={false} onDrop={() => dragEnd(indexes[0])} onDragOver={(e) => {e.preventDefault()}} style={{...cardStyles.card, height: cardHeight}} src={firstAce.cardNumber === 0 ? "empty_spot.png" : `${firstAce.cards?.[0].symbol}_${firstAce.cards?.[0].value}.png`}></img>
            <img onContextMenu={(e) => e.preventDefault()} draggable={false} onDrop={() => dragEnd(indexes[1])} onDragOver={(e) => {e.preventDefault()}} style={{...cardStyles.card, height: cardHeight}} src={secondAce.cardNumber === 0 ? "empty_spot.png" : `${secondAce.cards?.[0].symbol}_${secondAce.cards?.[0].value}.png`}></img>
        </div>
    )
}

export default AceLine