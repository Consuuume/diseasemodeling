<script lang="ts">
    import { afterUpdate, onMount } from 'svelte';
    import * as d3 from 'd3';
    import { infectedData } from '../stores/infectedData';

    let margin = { top: 20, right: 20, bottom: 30, left: 50 };
    let width = 500 - margin.left - margin.right;
    let height = 200 - margin.top - margin.bottom;

    let svg;
    let x: d3.ScaleLinear<number, number, never> | { (arg0: any): number; domain: (arg0: [any, any]) => void; };
    let y: d3.ScaleLinear<number, number, never> | { (arg0: any): number; domain: (arg0: any[]) => void; };
    let path: d3.Selection<SVGPathElement, never[], HTMLElement, any>;

    function setupGraph() {
        svg = d3.select('#graph-container')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .style("border", "2px solid steelblue")
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

        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height - 6)
            .text("TIME");

        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", 6)
            .attr("dy", "-1em")
            .attr("transform", "rotate(-90)")
            .text("Infected People");
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