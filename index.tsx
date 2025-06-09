// index.tsx (TypeScript Source Reference)
// The main executable JavaScript is now inlined in 3gpp_simulator.html.
// This file serves as the TypeScript source from which that JavaScript was derived.
// Type imports are for TypeScript development-time type checking.

import type { Position } from './types';
import type { GNB } from './gnb';
import type { GroundStation } from './groundstation';
import type { Satellite } from './satellite';
import type { UE } from './ue';
import type { Block, Street } from './map_elements';

// Note: In the actual running HTML, 'sim' and 'displayCriticalError' are global (window.sim, window.displayCriticalError).
// The 'export' keyword is removed here to reflect that they are not being exported as ES6 modules
// in the final inlined version. This file is for reference and development.

const sim = { // This object would be window.sim in the HTML
    bs: new Map<number, GNB>(),
    ues: new Map<number, UE>(),
    blocks: [] as Block[],
    streets: [] as Street[],
    sats: [] as Satellite[],
    groundStations: new Map<number, GroundStation>(),
    msgs: [] as Array<{type: string, from: string, to: string, data: any, ts: number, dlv: number}>,
    log: [] as Array<{t: string, cat: string, from: string, to: string, msg: string}>,
    running: false, time: 0, speed: 3,
    cv: null as HTMLCanvasElement | null,
    ctx: null as CanvasRenderingContext2D | null,
    gnbpcv: null as HTMLCanvasElement | null,
    gnbpctx: null as CanvasRenderingContext2D | null,
    uepcv: null as HTMLCanvasElement | null,
    uepctx: null as CanvasRenderingContext2D | null,
    cellTput: new Map<number, { history: Array<{ t: number, v: number }> }>(),
    lastScanTime: 0, noServiceGrid: [] as number[][],
    gnbSize: 0.5, ntnSize: 0.5, scanInterval: 2000, 
    // UE_TURN_PROBABILITY_AT_INTERSECTION is in simulationCoreConfig
    // COVERAGE_GRID_RESOLUTION is in simulationCoreConfig.
    // Constants like GNB_CAPACITY, GNB_PREFERENCE_DB etc. are now in simulationCoreConfig in the HTML.
    // REF_WIDTH, REF_HEIGHT etc. are in simulationCoreConfig.
    scaleX: 1, scaleY: 1,

    init() {
        // In HTML, this uses initializeAllCanvases() and refers to simulationCoreConfig
        console.log("sim.init() called (from TSX reference).");
        const mapCanvas = document.getElementById('map') as HTMLCanvasElement;
        if (!mapCanvas) {
            displayCriticalError("Error: Main simulation canvas 'map' not found.");
            return;
        }
        this.cv = mapCanvas;
        this.ctx = this.cv.getContext('2d');
        if (!this.ctx) {
            displayCriticalError("Error: Failed to get 2D context for 'map' canvas.");
            return;
        }
        console.log("sim.init() completed (from TSX reference).");
    },

    setGnbSize(value: number) { 
        this.gnbSize = value; 
    },
    setNtnSize(value: number) { 
        this.ntnSize = value; 
    },
    addUE(id?: number, initialPos?: Position) {
        // In HTML, this uses ueMoveFn and refers to simulationCoreConfig
        const ueId = id || (this.ues.size + 1);
        const streetPos = initialPos || this.streets[Math.floor(Math.random() * this.streets.length)];
        const dirs: Position[] = [{x:1,y:0}, {x:-1,y:0}, {x:0,y:1}, {x:0,y:-1}];
        const dir = dirs[Math.floor(Math.random() * 4)];
        const ue: UE = {
            id: ueId, pos: {...streetPos}, dir, speed: 7 + Math.random() * 7,
            cell: null, cell_obj: null,
            sm: {rrc:'IDLE', nas:'DEREG', procs:new Set()},
            tput: [], curTput: 0,
            qualityHistory: [], currentMultiplier: 0,
            signalQualities: new Map(),
            cellsPassed: 0, cellsConnected: 0, cellsSignalling: 0, cellsSearching: 0, lastGridPos: null,
            move(dt: number) {
                // This would call ueMoveFn(this, dt, window.sim.streets) in HTML,
                // and ueMoveFn would use simulationCoreConfig for turn probability
                this.pos.x += this.dir.x * this.speed * dt; // Simplified for brevity
            }
        };
        this.ues.set(ueId, ue); 
    },

    findBest(ue_or_pos: UE | Position, isLightweightCheck = false): GNB | Satellite | null {
        return null;
    },
    send(type: string,from: string,to: string,data:any={}) {
        this.msgs.push({type,from,to,data,ts:Date.now(),dlv:Date.now()+(type.startsWith('RRC')?15:25)});
    },
    rach(ue: UE) { /* ... */ },
    process() { /* ... */ },
    handleRLF(ue: UE, cell: GNB | Satellite) { /* ... */ },
    checkRLF() { /* ... */ },
    checkHO() { /* ... */ },
    completeHO(ue: UE, targetId: number) { /* ... */ },
    updateSatelliteFeeders() { /* ... */ },
    scanForNetworks() { /* ... */ },
    updateUeGridMetrics() { /* ... */ },
    updateTputAndQuality() { /* ... */ },
    render() { /* ... */ },
    step() { /* ... */ },
    toggle() { /* ... */ },
    forceHO() { /* ... */ },
    reset() { /* ... */ }
};

function displayCriticalError(message: string) {
    let errDiv = document.getElementById('critical-error-display');
    if (errDiv) {
        errDiv.textContent = message;
    }
}

console.log("index.tsx (TypeScript source reference) parsed.");
