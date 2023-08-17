// @ts-nocheck
import { writable } from 'svelte/store';

function createInfectedData() {
    const {subscribe, set, update} = writable([]);

    return {
        subscribe,
        push: (toPush) => update((items) => [...items, toPush]),
        reset: () => set([])
    }
}

export const infectedData = createInfectedData();