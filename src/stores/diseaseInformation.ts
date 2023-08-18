import * as store from 'svelte/store';

class DiseaseInformation {
    constructor(public transmissibility: store.Writable<number> = store.writable(0.01),
        public detectability: store.Writable<number> = store.writable(0.01)) {

    }
}

export const diseaseInformation = new DiseaseInformation();