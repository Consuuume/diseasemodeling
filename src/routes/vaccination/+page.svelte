<script lang="ts">
    import Person from '../../components/Person.svelte';
    import InfectedCount from '../../components/InfectedCount.svelte';
    import { onMount } from 'svelte';
    import { infectedCount } from '../../stores/infectedCount';
    import { infectedData } from '../../stores/infectedData';
    import InfectionGraph from '../../components/InfectionGraph.svelte';
	import Nav from '../../components/Nav.svelte';
      
  
    let numPeople = 1000;
    let persons:any[] = [];
    let startTime = new Date();
      
    const reset = () => {
      infectedData.reset();
      infectedCount.reset();
      persons.forEach(person => {
          person.reset();
      });
      const randomPerson = persons[Math.floor(Math.random() * persons.length)];
      startTime = new Date();
      randomPerson.infect();
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
  
  <div id="simulation-container">
    {#each Array(numPeople) as _, i}
      <Person bind:this={persons[i]} />
    {/each}
    
  </div>
  <div>
    <InfectedCount startingHealthyCount={numPeople} />
  </div>
  
  <InfectionGraph />

  <button on:click={reset}>Reset</button>