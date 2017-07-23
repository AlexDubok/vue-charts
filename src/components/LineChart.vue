<template>
    <div>
        <h2>Monthly Average Temperature</h2>
        <h5>Source: WorldClimate.com</h5>
        <div class='lineChart' ref='lineChart' />
    </div>
</template>

<script>
import Line from '../lib/Line';
import tempData from '../datasets/temperature_london.json';

export default {
    name: 'line-chart',
    mounted() {
        const data = tempData[0].map((item, i) => ({ y: tempData[1][i], color: 'red', month: item })); // eslint-disable-line
        const line = this.$refs.lineChart;

        const config = {
            chart: {
                width : 800,
                height: 600
            },
            xAxis: {
                title     : 'Month',
                labelKey  : 'month',
                labelClass: 'xAxis-label'
            },
            yAxis: {
                title     : 'Temperature (°C)',
                labelClass: 'yAxis-label'
            },
            series: {
                data
            },
            tooltip: {
                className  : 'tooltip',
                formatLabel: d => `Average temperature in London in ${(d.month)}:<br/>${d.y} &deg;C`
            }
        };
        const barChart = new Line(line, config);
        barChart.init();
    }
};
</script>

<style>
    .lineChart {
        position: relative;
        margin-bottom: 40px;
    }
    .line {
        fill: none;
        stroke: #ffab00;
        stroke-width: 3;
        position: relative;
    }

    .dot {
        fill: #ffab00;
        stroke: #fff;
    }
</style>

