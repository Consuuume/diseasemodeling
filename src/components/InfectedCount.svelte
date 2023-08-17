<script>
    export let startingHealthyCount = 0;
    export let startingSickCount = 0;
    import { infectedCount } from '../stores/infectedCount.js'

    const totalCount = () => startingHealthyCount + startingSickCount;
    const sickPercentage = (count) => ((count / totalCount()) * 100).toFixed(2);
</script>

<p>Infected Count: {$infectedCount} / {totalCount()} {sickPercentage($infectedCount)}%</p>