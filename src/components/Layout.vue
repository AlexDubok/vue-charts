<template>
    <div class='Layout'>
        <h1>Custom chart library based on d3</h1>
        <pie-chart/>
        <bar-chart/>
        <line-chart/>
    </div>
</template>

<script>
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';

export default {
    name      : 'layout',
    components: {
        BarChart,
        LineChart,
        PieChart
    }
};
</script>

<style>
    .Layout {
        width: 100%;
        padding: 0 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tooltip {
        position: absolute;
        transition: all .3s ease;
        background: black;
        color: ivory;
        transform: translateX(-40%);
        padding: 10px;
        min-width: 150px;
        pointer-events: none;
    }
</style>

