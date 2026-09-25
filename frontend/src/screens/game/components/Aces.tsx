import type { AceProps } from "../properties/acesProps"
import AceLine from "./AceLine"

const Aces = ({aces, setDestination}: AceProps) => {

    return (
        <div>
            <AceLine firstAce={aces[0]} secondAce={aces[1]} indexes={[0,1]} setDestination={setDestination}></AceLine>
            <AceLine firstAce={aces[2]} secondAce={aces[3]} indexes={[2,3]} setDestination={setDestination}></AceLine>
            <AceLine firstAce={aces[4]} secondAce={aces[5]} indexes={[4,5]} setDestination={setDestination}></AceLine>
            <AceLine firstAce={aces[6]} secondAce={aces[7]} indexes={[6,7]} setDestination={setDestination}></AceLine>
        </div>
    )
}

export default Aces