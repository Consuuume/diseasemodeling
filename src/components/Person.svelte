<script lang="ts">
    export let isSick = false;
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
    import * as d3 from 'd3';
    import { infectedCount } from '../stores/infectedCount.js';
    import { infectedData } from '../stores/infectedData.js';

    let x = 0;
    let y = 0;
    const diseaseRadius:number = 20;
    const diseaseRadiusSquared:number = Math.pow(diseaseRadius, 2);
    const speed = 30;

    let circleElement:any;
    let svg;
    let interval:any;

    function setRandomPosition() {
        x = Math.random() * 800;
        y = Math.random() * 600;
    }

    function updatePosition() {
        const newX = x + (Math.random() - 0.5) * speed;
        const newY = y + (Math.random() - 0.5) * speed;

        // Stay within bounds
        x = Math.max(0, Math.min(800, newX));
        y = Math.max(0, Math.min(600, newY)); 

        d3.select(circleElement)
            .attr('cx', x)
            .attr('cy', y);
        
        circleElement?.setAttribute('cx', x);
        circleElement?.setAttribute('cy', y);

        if (!isSick) {
            let sickPeople = document.querySelectorAll('.person-circle.sick');
            for(let otherCircle of sickPeople) {
                const otherX = parseFloat(otherCircle.getAttribute('cx') ?? "100000000000000000000000000");
                const otherY = parseFloat(otherCircle.getAttribute('cy') ?? "100000000000000000000000000");
                const distanceSquared = Math.pow(x - otherX, 2) + Math.pow(y - otherY, 2);

                if (distanceSquared < diseaseRadiusSquared) {
                    infect();
                    break;
                }
            };
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