<template>
  <div>
    <h2>World's largest cities per 2014</h2>
    <h5>Source: Wikipedia</h5>
    <div class='barChart' ref='barChart'></div>
  </div>
</template>

<script>
import Bars from '../lib/Bars';
import cityPopulation from '../datasets/cityPopulation.json';

export default {
    name: 'bar-chart',
    mounted() {
        const data = cityPopulation.map(item => ({ y: item[1], color: '#3cafe2', city: item[0] })); // eslint-disable-line
        const bars = this.$refs.barChart;

        const config = {
            chart: {
                width : 800,
                height: 600
            },
            xAxis: {
                title     : 'City',
                labelKey  : 'city',
                labelClass: 'xAxis-label'
            },
            yAxis: {
                title     : 'Population (millions)',
                labelClass: 'yAxis-label'
            },
            series: {
                data
            },
            tooltip: {
                className  : 'tooltip',
                formatLabel: d => `Population in 2008 (${(d.city)}):<br/>${d.y}`
            }
        };
        const barChart = new Bars(bars, config);
        barChart.init();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    h2 {
        color: tomato;
    }

    .barChart {
        position: relative;
        margin-bottom: 40px;
    }

    .xAxis-label {
        font-size: 14px;
        transform: rotate(-45deg);
        text-anchor: end;
    }

    .yAxis-label {
        font-size: 14px;
    }

</style>
