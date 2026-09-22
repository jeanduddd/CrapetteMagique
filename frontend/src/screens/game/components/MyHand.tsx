import type { HandsProps } from "../properties/handsProps"
import styles from "../style/handsStyle"

const MyHand = ({crapette, bin, draw}: HandsProps) => {
    return (
        <div style={styles.hand2}>
            {draw.cardNumber === -1 ? <img src={'card_back.png'}></img> : draw.cardNumber === 0 ? <>{/*faire un logo vide ou genre de case vide*/}</> : <img src={`${bin.cards?.[0].symbol}_${crapette.cards?.[0].value}.png`}></img>}
            {bin.cardNumber === 0 ? <>{/*faire un logo vide ou genre de poubelle*/}</> : <img src={`${bin.cards?.[0].symbol}_${crapette.cards?.[0].value}.png`}></img>}
            {crapette.cardNumber === 0 ? <>{/*faire un logo vide ou genre de rond barré*/}</> : <img src={`${crapette.cards?.[0].symbol}_${crapette.cards?.[0].value}.png`}></img>}
        </div>
    )
}

export default MyHand