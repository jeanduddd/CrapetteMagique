import type { PileData, Location } from "@shared/IPlayCard"

export type BoardProps = {
    aces: PileData[],
    boardPiles: PileData[]
    setOrigin: (arg0: Location) => void
    setDestination: (arg0: Location) => void
}