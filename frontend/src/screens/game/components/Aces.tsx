import type { AceProps } from "../properties/acesProps"
import AceLine from "./AceLine"

const Aces = ({aces}: AceProps) => {

    console.log(aces);
    

    return (
        <div>
            <AceLine firstAce={aces[0]} secondAce={aces[1]}></AceLine>
            <AceLine firstAce={aces[2]} secondAce={aces[3]}></AceLine>
            <AceLine firstAce={aces[4]} secondAce={aces[5]}></AceLine>
            <AceLine firstAce={aces[6]} secondAce={aces[7]}></AceLine>
        </div>
    )
}

export default Aces