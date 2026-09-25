import type { PileData, Location } from "@shared/IPlayCard"

export type AceLineProps = {
    firstAce: PileData,
    secondAce: PileData,
    setDestination: (arg0: Location) => void,
    indexes: number[]
}