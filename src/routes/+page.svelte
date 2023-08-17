<script>
  import Person from '../components/Person.svelte';
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
  {#each Array(1000) as _, i}
    <Person />
  {/each}
  <Person isSick={true} />
  
</div>