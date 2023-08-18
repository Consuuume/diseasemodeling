<script lang="ts">
	import { Slider } from "fluent-svelte";

    export let numPeopleSliderValue:number;
</script>

<style>
    .numPeopleSection {
      width: 40%;
    }
  </style>

<div class="numPeopleSection">
    Number of People: {numPeopleSliderValue}
    <Slider bind:value={numPeopleSliderValue} min={10} max={1000} />
</div>