import type { PileData, Location } from "@shared/IPlayCard"

export type HandsProps = {
    crapette: PileData,
    bin: PileData,
    draw: PileData,
    setOrigin: (arg0: Location) => void,
    setDestination: (arg0: Location) => void
    revealDraw: () => void
    myTurn?: boolean
    sayCrapette?: ()=> void
    canSayCrapette?: boolean
    name: string
}