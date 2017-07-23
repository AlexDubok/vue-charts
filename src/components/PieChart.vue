<template>
    <div>
        <h2>Browser market shares    January, 2015 to May, 2015</h2>
        <div class='pieChart' ref='pieChart' />
    </div>
</template>

<script>
import Pie from '../lib/Pie';
import browserData from '../datasets/browserData.json';

export default {
    name: 'pie-chart',
    mounted() {
        const pie = this.$refs.pieChart;

        const config = {
            chart: {
                width : 800,
                height: 600,
                margin: {
                    bottom: 0
                }
            },
            series: {
                labelKey  : 'name',
                labelClass: 'pie-label',
                data      : browserData
            },
            tooltip: {
                className  : 'tooltip',
                formatLabel: d => `${(d.name)}:<br/>${d.y}%`
            }
        };
        const barChart = new Pie(pie, config);
        barChart.init();
    }
};
</script>

<style>

    .pieChart {
        position: relative;
        margin-bottom: 40px;
    }

    .pie-plot {
        border: 1px solid black;
    }
    .pie-label {
        font-size: 16px;
        fill: darkblue;
        text-anchor: middle;
    }
</style>

