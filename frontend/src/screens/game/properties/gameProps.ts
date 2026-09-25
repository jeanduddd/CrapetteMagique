import type { GameState, Location } from "@shared/IPlayCard"

export type GameProps = {
    gameState: GameState | null,
    setOrigin: (arg0: Location) => void
    setDestination: (arg0: Location) => void
    origin: Location | null
    revealDraw: () => void
}