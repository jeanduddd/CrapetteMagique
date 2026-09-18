export type ZoneName = 'DRAW' | 'CRAPETTE' | 'BIN' | 'THROW' | 'BOARD' | 'ACE';

export interface Location {
    zone: ZoneName;
    index: number|null;
}

export interface PlayRequest {
    origine: Location;
    destination: Location;
}

export interface CardData {
    value: number;
    symbol: string;
}

export interface CardCollectionData {
    nombreDeCartes: number;
    cartesVisibles?: CardData[]; 
}

export interface PileData {
    cardNumber: number;
    cards?: CardData[];
}

export interface GameState {
    myTurn: boolean;
    draw: PileData;
    bin: PileData;
    enemyBin: PileData;
    crapette: PileData;
    enemyCrapette: PileData;
    aces: PileData[];
    board: PileData[]
}