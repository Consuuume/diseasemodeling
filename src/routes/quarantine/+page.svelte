<script lang="ts">
  import Person from '../../components/Person.svelte';
  import InfectedCount from '../../components/InfectedCount.svelte';
  import { onMount } from 'svelte';
  import { infectedCount } from '../../stores/infectedCount';
  import { infectedData } from '../../stores/infectedData';
  import InfectionGraph from '../../components/InfectionGraph.svelte';
	import Nav from '../../components/Nav.svelte';
	import PopulationSlider from '../../components/PopulationSlider.svelte';
  import PersonRoutine from '../../classes/PersonRoutine';  
	import { quarantineZoneLocation } from '../../stores/quarantineZoneLocation';

  let container:any;
  let numPeople = 500;
  let persons: Person[] = [];

  let numPeopleSliderValue:number = 500;
  
  let locations: [number, number][] = [];
  
  const reset = () => {
    quarantineZoneLocation.zoneX.set(800);
    quarantineZoneLocation.zoneY.set(600);
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
          transmissability: 0.01, 
          xMax: 600, 
          yMax: 450, 
          detectability: 0.01}
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
  <PopulationSlider bind:numPeopleSliderValue={numPeopleSliderValue} />
  <button on:click={reset}>Reset</button>
</div>
