import type { HandsProps } from "../properties/handsProps"
import handStyles from "../style/handsStyle"
import cardStyles from "../style/cardStyle"

const MyHand = ({crapette, bin, draw}: HandsProps) => {
    return (
        <div style={{...handStyles.hand}}>
            {draw.cardNumber === -1 ? <img style={cardStyles.card} src={'card_back.png'}></img> : draw.cardNumber === 0 ? <img style={cardStyles.card} src={'empty_spot.png'}></img> : <img style={cardStyles.card} src={`${bin.cards?.[0].symbol}_${crapette.cards?.[0].value}.png`}></img>}
            {bin.cardNumber === 0 ? <img style={cardStyles.card} src={'trash_spot.png'}></img> : <img style={cardStyles.card} src={`${bin.cards?.[0].symbol}_${crapette.cards?.[0].value}.png`}></img>}
            {crapette.cardNumber === 0 ? <img style={cardStyles.card} src={'forbidden_spot.png'}></img> : <img style={cardStyles.card} src={`${crapette.cards?.[0].symbol}_${crapette.cards?.[0].value}.png`}></img>}
        </div>
    )
}

export default MyHand