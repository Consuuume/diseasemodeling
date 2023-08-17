<script>
// @ts-nocheck

  import Person from '../components/Person.svelte';
  import InfectedCount from '../components/InfectedCount.svelte';
	import { onMount } from 'svelte';
	import { resetInfectedCount } from '../stores/infectedCount';


  let numPeople = 1000;
  let numStartingInfected = 1;
  let persons = [];
  
  const reset = () => {
    resetInfectedCount();
    persons.forEach(person => {
        person.reset();
    });
    const randomPerson = persons[Math.floor(Math.random() * persons.length)];
    randomPerson.infect();
  }

  onMount(() => {
    const randomPerson = persons[Math.floor(Math.random() * persons.length)];
    randomPerson.infect();
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

<div id="simulation-container">
  {#each Array(numPeople) as _, i}
    <Person bind:this={persons[i]} />
  {/each}
  
</div>
<div>
  <InfectedCount startingHealthyCount={numPeople} startingSickCount={numStartingInfected} />
</div>
<button on:click={reset}>Reset</button>