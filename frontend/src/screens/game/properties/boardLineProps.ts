import type { PileData, Location } from "@shared/IPlayCard"

export type BoardLineProps = {
    cards: PileData,
    setOrigin : (arg0: Location) => void,
    setDestination: (arg0: Location) => void
    myIndex: number,
    isOrigin: boolean
}