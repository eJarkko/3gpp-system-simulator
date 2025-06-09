// gnb.ts
import type { BaseStationShared } from './base_station';

export interface GNB extends BaseStationShared {
    type: 'gnb';
    coverageGrid: number[][];
}
