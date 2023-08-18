<script lang="ts">
	import { Slider } from "fluent-svelte";

    export let sliderValue:number;
    export let label:string;
    export let min:number = 10;
    export let max:number = 1000;
    export let step:number = 1;
</script>

<style>
    .numPeopleSection {
      width: 40%;
    }
  </style>

<div class="numPeopleSection">
    {label} {sliderValue}
    <Slider bind:value={sliderValue} min={min} max={max} step={step} />
</div>