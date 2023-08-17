<script>
// @ts-nocheck

    export let startTime = null; 
    import { afterUpdate, onMount } from 'svelte';
    import * as d3 from 'd3';
    import { infectedData } from '../stores/infectedData';

    let margin = { top: 20, right: 20, bottom: 30, left: 50 };
    let width = 500 - margin.left - margin.right;
    let height = 200 - margin.top - margin.bottom;

    let svg;
    let x;
    let y;
    let path;

    function setupGraph() {
        svg = d3.select('#graph-container')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);


        x = d3.scaleLinear().range([0, width]);
        y = d3.scaleLinear().range([height, 0]);

        x.domain(d3.extent($infectedData, d => d.time));
        y.domain([0, d3.max($infectedData, d => d.count)]);

        path = svg.append('path')
            .datum($infectedData)
            .attr('class', 'line')
            .attr('d', d3.line()
                .x(d => x(d.time))
                .y(d => y(d.count))
            );
    }

    function updateGraph() {
        x.domain(d3.extent($infectedData, d => d.time));
        y.domain([0, d3.max($infectedData, d => d.count)]);

        const line = d3.line()
            .x(d => x(d.time))
            .y(d => y(d.count));

        path.datum($infectedData)
            .style("fill", "none")
            .style("stroke", "steelblue")
            .style("stroke-width", "2")
            .attr('d', line);
    }

    onMount(() => {
        setupGraph();
    });

    afterUpdate(() => {
        updateGraph();
    });
</script>

<div id="graph-container"></div>