<script lang="ts">
    export let startingHealthyCount = 0;
    import { infectedCount } from '../stores/infectedCount.js'

    const totalCount = () => startingHealthyCount;
    const sickPercentage = (count: number) => ((count / totalCount()) * 100).toFixed(2);
</script>

<p>Infected Count: {$infectedCount} / {totalCount()} {sickPercentage($infectedCount)}%</p>