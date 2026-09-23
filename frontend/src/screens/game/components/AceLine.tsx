import type { AceLineProps } from "../properties/aceLineProps"
import aceLineStyle from "../style/aceLineStyle"
import cardStyles from "../style/cardStyle"
import GameStyles from "../style/GameScreenStyle"

const AceLine = ({firstAce, secondAce}: AceLineProps) => {
    return (
        <div style={{...aceLineStyle.aceLine, ...GameStyles.border}}>
            <img style={cardStyles.card} src={firstAce.cardNumber === 0 ? "card_back.png" : `${firstAce.cards?.[0].symbol}_${firstAce.cards?.[0].value}.png`}></img>
            <img style={cardStyles.card} src={secondAce.cardNumber === 0 ? "card_back.png" : `${secondAce.cards?.[0].symbol}_${secondAce.cards?.[0].value}.png`}></img>
        </div>
    )
}

export default AceLine