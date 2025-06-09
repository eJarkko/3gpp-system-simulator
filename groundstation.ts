// groundstation.ts
import type { Position } from './types';

export interface GroundStation {
    id: number;
    pos: Position;
    type: 'gs';
}
