class PersonRoutine {
    destinations: [number, number][] | null;
    private routeIndex:number | null;

    constructor(destinations?:[number, number][]) {
        this.destinations = destinations ?? null;
        this.routeIndex = this.destinations ? 0 : null;
    }

    getDirectionsToNextDestination = (x: number, y:number) => {
        if (!this.destinations || this.routeIndex === null) return null;
        return [this.destinations[this.routeIndex][0] - x, this.destinations[this.routeIndex][1] - y];
    }

    destinationReached = () => {
        if (this.routeIndex === null || !this.destinations) return;
        this.routeIndex += 1;
        if (this.routeIndex >= this.destinations.length) {
            this.routeIndex = 0;
        }
    }
}

export default PersonRoutine;