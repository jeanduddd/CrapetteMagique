import type { PileData, Location } from "@shared/IPlayCard"

export type BoardPilesProps = {
    leftPiles?: PileData[],
    rightPiles?: PileData[],
    setOrigin: (arg0:Location) => void
    setDestination: (arg0: Location) => void
}