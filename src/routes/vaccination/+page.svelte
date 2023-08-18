<script lang="ts">
  import Person from '../../components/Person.svelte';
  import InfectedCount from '../../components/InfectedCount.svelte';
  import { onMount } from 'svelte';
  import { infectedCount } from '../../stores/infectedCount';
  import { infectedData } from '../../stores/infectedData';
  import InfectionGraph from '../../components/InfectionGraph.svelte';
	import Nav from '../../components/Nav.svelte';
	import PopulationSlider from '../../components/PopulationSlider.svelte';
    

  let container:any;
  let numPeople = 500;
  let persons: Person[] = [];

  let numPeopleSliderValue:number = 500;
    
  const reset = () => {
    numPeople = numPeopleSliderValue;
    persons.forEach(p => {
      p.$destroy();
    });
    persons = [];
    for (let i = 0; i < numPeople; i++) {
        const person = new Person({
          target: container,
          props: {isSick: false}
        });
        persons.push(person);
    }
    infectedData.reset();
    infectedCount.reset();
    console.log("there are " + persons.length + " people now")
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
