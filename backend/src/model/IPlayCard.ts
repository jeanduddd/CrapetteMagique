export type ZoneName = 'DRAW' | 'CRAPETTE' | 'BIN' | 'THROW' | 'BOARD' | 'ACE';

export interface Location {
    zone: ZoneName;
    index: number|null;
}

export interface PlayRequest {
    origine: Location;
    destination: Location;
}