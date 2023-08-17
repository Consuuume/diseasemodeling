<script>
// @ts-nocheck
    export let isSick = false;
    
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    let x = 0;
    let y = 0;
    let diseaseRadius = 20;
    const speed = 5;

    let circleElement;
    let svg;
    
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
        
        circleElement.setAttribute('cx', x);
        circleElement.setAttribute('cy', y);

        if (!isSick) {
            // Loop through all other Person components on the page
            document.querySelectorAll('.person-circle').forEach(otherCircle => {
                if (otherCircle !== circleElement) {
                    const otherX = +otherCircle.getAttribute('cx');
                    const otherY = +otherCircle.getAttribute('cy');
                    const distance = Math.sqrt(Math.pow(x - otherX, 2) + Math.pow(y - otherY, 2));

                    if (distance < diseaseRadius && otherCircle.classList.contains('sick')) {
                        isSick = true;
                        circleElement.setAttribute('class', 'person-circle sick');
                    }
                }
            });
        }
    }

    onMount(() => {
        setRandomPosition();
        if (isSick) {
            circleElement.setAttribute('class', 'person-circle sick');
        }
        setInterval(updatePosition, 100);
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