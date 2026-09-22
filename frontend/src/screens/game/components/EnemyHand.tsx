import type { HandsProps } from "../properties/handsProps"
import styles from "../style/handsStyle"

const EnemyHand = ({crapette, bin, draw}: HandsProps) => {
    return (
        <div style={styles.hand1}>
            {crapette.cardNumber === 0 ? <>{/*faire un logo vide ou genre de rond barré*/}</> : <img src={`${crapette.cards?.[0].symbol}_${crapette.cards?.[0].value}.png`}></img>}
            {bin.cardNumber === 0 ? <>{/*faire un logo vide ou genre de poubelle*/}</> : <img src={`${bin.cards?.[0].symbol}_${crapette.cards?.[0].value}.png`}></img>}
            {draw.cardNumber === -1 ? <img src={'card_back.png'}></img> : draw.cardNumber === 0 ? <>{/*faire un logo vide ou genre de case vide*/}</> : <img src={`${bin.cards?.[0].symbol}_${crapette.cards?.[0].value}.png`}></img>}
        </div>
    )
}

export default EnemyHand

/*
<div>
            {crapette.cardNumber === 0 ? <></> : <img src={`${crapette.cards?.[0].symbol}_${crapette.cards?.[0].value}`}></img>}
            {bin.cardNumber === 0 ? <></> : <img src={`${bin.cards?.[0].symbol}_${crapette.cards?.[0].value}`}></img>}
            {draw.cardNumber === -1 && <img src={'card_back.png'}></img>}
            {draw.cardNumber === 0 ? <></> : <img src={`${bin.cards?.[0].symbol}_${crapette.cards?.[0].value}`}></img>}
        </div>
*/