export type ZoneName = 'DRAW' | 'CRAPETTE' | 'BIN' | 'THROW' | 'BOARD' | 'ACE';

export interface Location {
    zone: ZoneName;
    index?: number;
}

export interface PlayRequest {
    origine: Location;
    destination: Location;
}