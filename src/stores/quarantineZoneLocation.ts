import * as store from 'svelte/store';

class QuarantineZoneLocation {
    constructor(public zoneX: store.Writable<number> = store.writable(0), public zoneY: store.Writable<number> = store.writable(0)) {

    }

    get location() {
        return store.derived([this.zoneX, this.zoneY], ([$x, $y]) => {
            return {zoneX: $x, zoneY: $y}
        });
    }
}

export const quarantineZoneLocation = new QuarantineZoneLocation();