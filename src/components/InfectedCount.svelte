<script lang="ts">
    export let startingHealthyCount = 0;
    import { infectedCount } from '../stores/infectedCount.js'
    const sickPercentage = (count: number) => ((count / startingHealthyCount) * 100).toFixed(2);
</script>

<p>Infected Count: {$infectedCount} / {startingHealthyCount} {sickPercentage($infectedCount)}%</p>