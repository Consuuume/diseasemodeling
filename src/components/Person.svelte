<script lang="ts">
    export let xMax:number=800;
    export let yMax:number=600;
    export let transmissability:number = 1;
    export let detectability:number = 0;
    export let speed:number = 30;
    export let isSick:boolean = false;
    export let routine:PersonRoutine | undefined = undefined;
    export function reset() {
        isSick = false;
        circleElement.setAttribute('class', 'person-circle');
        setRandomPosition();
    }
    export function infect() {
        isSick = true;
        circleElement.setAttribute('class', 'person-circle sick');
        infectedCount.increment();
        infectedData.push({ time: new Date(), count: $infectedCount });
    }
    
    import { onDestroy, onMount } from 'svelte';
    import { infectedCount } from '../stores/infectedCount.js';
    import { infectedData } from '../stores/infectedData.js';
	import type PersonRoutine from '../classes/PersonRoutine.js';
	import { quarantineZoneLocation } from '../stores/quarantineZoneLocation.ts';

    const {zoneX, zoneY} = quarantineZoneLocation;
    let x = 0;
    let y = 0;
    const diseaseRadius:number = 20;
    const diseaseRadiusSquared:number = Math.pow(diseaseRadius, 2);

    let circleElement:any;
    let svg;
    let interval:any;

    let detected = false;

    function setRandomPosition() {
        x = Math.random() * xMax;
        y = Math.random() * yMax;
    }

    function moveInBounds(moveX:number, moveY:number) {
        // Stay within bounds
        x = Math.max(0, Math.min(detected ? $zoneX : xMax, moveX));
        y = Math.max(0, Math.min(detected ? $zoneY : yMax, moveY)); 
    }

    function moveToQuarantine() {

        let mag = Math.sqrt(Math.pow($zoneX, 2) + Math.pow($zoneY, 2));
        if (mag === 0) return;
        let normalized = [$zoneX / mag, $zoneY / mag];
        
        let moveVec:[number, number] = [+x + normalized[0] * speed, +y + normalized[1] * speed]
        
        moveInBounds(Math.round(moveVec[0]), Math.round(moveVec[1]));
    }

    function moveThroughRoutine(x:number, y:number) {
        if (!routine || !circleElement) return;

        let toDestination = routine.getDirectionsToNextDestination(x, y);
        if (!toDestination) return;

        let mag = Math.sqrt(Math.pow(toDestination[0], 2) + Math.pow(toDestination[1], 2));
        if (mag === 0) return;
        let normalized = [toDestination[0] / mag, toDestination[1] / mag];
        
        let moveVec:[number, number] = [+x + normalized[0] * speed, +y + normalized[1] * speed]
        
        if (isNaN(Math.round(moveVec[0]))) debugger;
        moveInBounds(Math.round(moveVec[0]), Math.round(moveVec[1]));
        if (mag <= speed*2) {
            routine.destinationReached();
        }
        
    }

    function moveRandomly() {
        const newX = x + (Math.random() - 0.5) * speed;
        const newY = y + (Math.random() - 0.5) * speed;

        moveInBounds(newX, newY);
    }

    function updatePosition() {
        if (detected) {
            moveToQuarantine();
        }
        else if (routine && circleElement) {
            moveThroughRoutine(circleElement.getAttribute('cx'), circleElement.getAttribute('cy'));
        }
        else {
            moveRandomly();
        }

        if (!isSick) {
            let sickPeople = document.querySelectorAll('.person-circle.sick');
            for(let otherCircle of sickPeople) {
                const otherX = parseFloat(otherCircle.getAttribute('cx') ?? "100000000000000000000000000");
                const otherY = parseFloat(otherCircle.getAttribute('cy') ?? "100000000000000000000000000");
                const distanceSquared = Math.pow(x - otherX, 2) + Math.pow(y - otherY, 2);
                const willCatch = Math.random() <= transmissability;
                if (distanceSquared < diseaseRadiusSquared && willCatch) {
                    infect();
                    break;
                }
            };
        }

        if (isSick && !detected && Math.random() < detectability) {
            detected = true;
        }
    }

    onMount(() => {

        setRandomPosition();
        if (isSick) {
            circleElement.setAttribute('class', 'person-circle sick');
        }
        interval = setInterval(updatePosition, 100);
    });

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<svg bind:this={svg}>
    <!-- Render a circle at the specified x and y positions -->
    <circle bind:this={circleElement} class="person-circle" cx={x} cy={y} r="5" fill={isSick ? "red" :"blue"} />
</svg>

<style>
    svg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    .sick {
        fill: red;
    }
</style>