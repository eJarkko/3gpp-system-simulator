// ue.ts
import type { Position } from './types';
import type { GNB } from './gnb';
import type { Satellite } from './satellite';

export interface UE {
    id: number;
    pos: Position;
    dir: Position;
    speed: number;
    // nextTurn: boolean; // Removed: Turning is now probabilistic at intersections
    cell: number | null;
    cell_obj: GNB | Satellite | null;    sm: {
        rrc: string;
        nas: string;
        procs: Set<string>;
    };
    tput: Array<{ t: number; v: number }>;
    curTput: number;
    qualityHistory: Array<{ t: number; v: number }>;
    currentMultiplier: number;
    signalQualities: Map<number, { multiplier: number; isUsable: boolean }>;
    cellsPassed: number;
    cellsConnected: number;
    cellsSignalling: number;
    cellsSearching: number;
    lastGridPos: Position | null;
    move(dt: number): void; // Implementation will be provided at instance creation, may depend on 'sim'
}