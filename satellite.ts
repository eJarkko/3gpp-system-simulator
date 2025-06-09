// satellite.ts
import type { Position } from './types';
import type { BaseStationShared } from './base_station';
import type { GroundStation } from './groundstation';

export interface Satellite extends BaseStationShared {
    type: 'ntn';
    vel: number;
    phase: number;
    feederLinks: GroundStation[];
    maxFeederLinks: number;
    vis: () => boolean; // Implementation will be provided at instance creation, may depend on 'sim'
    coverageGrid?: number[][]; // NTN might not use grid in the same way, optional
}
