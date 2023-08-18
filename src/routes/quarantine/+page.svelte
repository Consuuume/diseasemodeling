<script lang="ts">
  import Person from '../../components/Person.svelte';
  import InfectedCount from '../../components/InfectedCount.svelte';
  import { onMount } from 'svelte';
  import { infectedCount } from '../../stores/infectedCount';
  import { infectedData } from '../../stores/infectedData';
  import InfectionGraph from '../../components/InfectionGraph.svelte';
	import Nav from '../../components/Nav.svelte';
  import PersonRoutine from '../../classes/PersonRoutine';  
	import { quarantineZoneLocation } from '../../stores/quarantineZoneLocation';
	import LabeledSlider from '../../components/LabeledSlider.svelte';
	import { diseaseInformation } from '../../stores/diseaseInformation';

  let container:any;
  let numPeople = 500;
  let persons: Person[] = [];

  let numPeopleSliderValue:number = 500;
  let transmissabilitySliderValue: number = 0.01;
  let detectabilitySliderValue: number = 0.01;
  
  let locations: [number, number][] = [];

  const { transmissibility, detectability } = diseaseInformation;
  
  const resetStores = () => {
    quarantineZoneLocation.zoneX.set(800);
    quarantineZoneLocation.zoneY.set(600);
    diseaseInformation.transmissibility.set(transmissabilitySliderValue);
    diseaseInformation.detectability.set(detectabilitySliderValue);
  }

  const reset = () => {
    resetStores();

    for (let index = 0; index < 10; index++) {
      locations.push([Math.floor(Math.random() * 600), Math.floor(Math.random() * 450)]) 
    }
    numPeople = numPeopleSliderValue;
    persons.forEach(p => {
      p.$destroy();
    });
    persons = [];
    for (let i = 0; i < numPeople; i++) {
      // Shuffle array
      const shuffled = locations.sort(() => 0.5 - Math.random());
      let randomLocations = shuffled.slice(0, 3);
      const person = new Person({
        target: container,
        props: {
          isSick: false, 
          routine:new PersonRoutine(randomLocations), 
          speed: 10, 
          transmissibility: $transmissibility, 
          xMax: 600, 
          yMax: 450, 
          detectability: $detectability}
      });
      persons.push(person);
    }
    infectedData.reset();
    infectedCount.reset();
    persons?.forEach(person => {
        person?.reset();
    });
    const randomPerson = persons[Math.floor(Math.random() * persons.length)];
    randomPerson?.infect();
  }

  onMount(() => {
    reset();
  });
</script>
    
<style>
  #simulation-container {
    width: 800px;
    height: 600px;
    border: 1px solid #ccc;
    position: relative;
  }
</style>

<Nav />

<div id="simulation-container" bind:this={container}>
  {persons}
  
</div>
<div>
  <InfectedCount bind:startingHealthyCount={numPeople} />
</div>

<InfectionGraph />

<div class="setup">
  <h2>Setup</h2>
  <LabeledSlider label={"Number of People: "} bind:sliderValue={numPeopleSliderValue} />
  <LabeledSlider label={"Disease Transmissibility: "} bind:sliderValue={transmissabilitySliderValue} min={0} max={1} step={0.001} />
  <LabeledSlider label={"Disease Detectability: "} bind:sliderValue={detectabilitySliderValue} min={0} max={1} step={0.001} />
  <button on:click={reset}>Reset</button>
</div>
