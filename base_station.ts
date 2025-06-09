// base_station.ts
import type { Position } from './types';

export interface BaseStationShared {
    id: number;
    pos: Position;
    pwr: number;
    sm: { ues: Map<number, any> }; // Value could be UE-specific data from BS perspective
}
