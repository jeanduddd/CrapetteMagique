import type { HandsProps } from "../properties/handsProps"
import handStyles from "../style/handsStyle"
import cardStyles from "../style/cardStyle"

const EnemyHand = ({crapette, bin, draw}: HandsProps) => {
    return (
        <div style={{...handStyles.hand}}>
            {crapette.cardNumber === 0 ? <>{/*faire un logo vide ou genre de rond barré*/}</> : <img style={cardStyles.card} src={`${crapette.cards?.[0].symbol}_${crapette.cards?.[0].value}.png`}></img>}
            {bin.cardNumber === 0 ? <>{/*faire un logo vide ou genre de poubelle*/}</> : <img style={cardStyles.card} src={`${bin.cards?.[0].symbol}_${crapette.cards?.[0].value}.png`}></img>}
            {draw.cardNumber === -1 ? <img style={cardStyles.card} src={'card_back.png'}></img> : draw.cardNumber === 0 ? <>{/*faire un logo vide ou genre de case vide*/}</> : <img style={cardStyles.card} src={`${bin.cards?.[0].symbol}_${crapette.cards?.[0].value}.png`}></img>}
        </div>
    )
}

export default EnemyHand