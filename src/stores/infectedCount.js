import { writable } from 'svelte/store';

export const infectedCount = writable(0);
export function resetInfectedCount() {
    infectedCount.set(0);
}