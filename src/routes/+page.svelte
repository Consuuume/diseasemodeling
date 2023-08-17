<script>
  import Person from '../components/Person.svelte';
  import InfectedCount from '../components/InfectedCount.svelte';
	import { onMount } from 'svelte';


  let startingNumHealthyPeople = 1000;
  let startingNumInfectedPeople = 1;
  
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
  {#each Array(startingNumHealthyPeople) as _, i}
    <Person />
  {/each}
  {#each Array(startingNumInfectedPeople) as _, i}
    <Person isSick={true} />
  {/each}
  
</div>
<div>
  <InfectedCount startingHealthyCount={startingNumHealthyPeople} startingSickCount={startingNumInfectedPeople} />
</div>