import type { HandsProps } from "../properties/handsProps"
import handStyles from "../style/handsStyle"
import cardStyles from "../style/cardStyle"
import type { ZoneName } from "@shared/IPlayCard"
import { useWindowSize } from "../../../screenSize"

const MyHand = ({crapette, bin, draw, setOrigin, setDestination, revealDraw, myTurn, sayCrapette, canSayCrapette, name}: HandsProps) => {

    const [width, height] = useWindowSize();

    const statusSize = Math.min(Math.min(height, width) * 0.022, 24);
    const crapetteFontSize = Math.min(height, width) * 0.02;
    const statusBorderSize = Math.min(height, width) * 0.004;
    const nicknameFontSize = Math.min(height, width) * 0.025;
    const nicknameHeight = Math.min(height, width) * 0.015;
    const nicknameGap = Math.min(height, width) * 0.01;
    const cardHeight = width > height ? 0.9 * ((height/6) - nicknameHeight - nicknameGap ) : 0.9 * ((width/6) - nicknameHeight - nicknameGap)


    const dragStart = (where: ZoneName) => {
        setOrigin({ zone:where, index: null });
    }

    const dragEnd = (where: ZoneName) => {
        setDestination( { zone:where, index: null })
    }

    return (
        <div style={{...handStyles.hand, height:height/6}}>
            <div style={{width: '100vw', alignItems:"center", display: "flex", flexDirection:"column", justifyContent:"center", gap:nicknameGap,  margin:0, padding:0, height: height/6}}>
                <div style={{margin:0, padding:0, height:nicknameHeight, textAlign:"center", verticalAlign:"center"}}>
                    <p style={{ margin: 0, fontSize: `${nicknameFontSize}px`, color: 'white' }}>{name}</p>
                </div>
                
                <div style={{...handStyles.hand, gap: width/20}}>
                    {draw.cardNumber === -1 ? <img onContextMenu={(e) => e.preventDefault()} draggable={false} onClick={revealDraw} style={{...cardStyles.card, height:cardHeight}} src={'card_back.png'}></img> : draw.cardNumber === 0 ? <img  onContextMenu={(e) => e.preventDefault()}draggable={false} style={{...cardStyles.card, height:cardHeight}} src={'empty_spot.png'}></img> : <img onContextMenu={(e) => e.preventDefault()} draggable="true" onClick={revealDraw} onDragStart={() => dragStart("DRAW")} style={{...cardStyles.card, height:cardHeight}} src={`${draw.cards?.[0].symbol}_${draw.cards?.[0].value}.png`}></img>}
                    {bin.cardNumber === 0 ? <img onContextMenu={(e) => e.preventDefault()} draggable={false} onDrop={() => dragEnd("THROW")} onDragEnter={(e) => e.preventDefault()} onDragOver={(e) => {e.preventDefault()}} style={{...cardStyles.card, height:cardHeight*0.93}} src={'trash_spot.png'}></img> : <img onContextMenu={(e) => e.preventDefault()} draggable="true" onDragStart={() => dragStart("BIN")} onDrop={() => dragEnd("THROW")} onDragEnter={(e) => e.preventDefault()} onDragOver={(e) => {e.preventDefault()}} style={{...cardStyles.card, height:cardHeight}} src={`${bin.cards?.[0].symbol}_${bin.cards?.[0].value}.png`}></img>}
                    {crapette.cardNumber === 0 ? <img  onContextMenu={(e) => e.preventDefault()}draggable={false} style={{...cardStyles.card, height:cardHeight}} src={'forbidden_spot.png'}></img> : <img onContextMenu={(e) => e.preventDefault()} draggable="true" onDragStart={() => dragStart("CRAPETTE")} style={{...cardStyles.card, height:cardHeight}} src={`${crapette.cards?.[0].symbol}_${crapette.cards?.[0].value}.png`}></img>}
                </div>
            </div>
            <div
                style={{
                    position: "absolute",
                    right: (width / 2) - (width / 20) - (cardHeight) * 2,
                    transform: "translate( 50% , 0)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems:"center"
                }}
            >
                <div style={{
                    width: `${statusSize}px`,
                    height: `${statusSize}px`,
                    borderRadius: "50%",
                    borderWidth: statusBorderSize,
                    borderStyle:"solid",
                    borderColor: "black",
                    backgroundColor: myTurn ? "lightgreen" : "red",
                    boxShadow: `0 ${statusBorderSize}px ${statusBorderSize*2.5}px rgba(0,0,0,0.3)`,
                    marginBottom: cardHeight/14
                    }}></div>
                {!canSayCrapette ? <button style={{height:cardHeight/4, opacity:0}}></button> : <button style={{fontSize: crapetteFontSize, height:cardHeight/4, cursor: 'pointer',backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '20px'}} onClick={sayCrapette}>Crapette !</button>}
                
            </div>
        </div>
    )
}

export default MyHand