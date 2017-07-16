<template>
  <div>
    <h2>{{msg}}</h2>
    <div ref='chart'></div>
  </div>
</template>

<script>
import Bars from '../lib/Bars';
import collegeData from '../datasets/college_enrolment.json';

export default {
    name: 'hello',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        };
    },
    mounted() {
        // `this` points to the vm instance
        const data = collegeData.map(item => ({
            state: item.State,
            y    : item._2017 // eslint-disable-line
        }));
        const chart = this.$refs.chart;

        const config = {
            data,
            width : 800,
            height: 600,
            style : {
                border: '2px solid tomato'
            },
            dataLabels: {
                labelKey: 'state',
                style   : {
                    transform: 'rotate(-45deg)'
                }
            }
        };
        const barChart = new Bars(chart, config);
        barChart.init();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  h2 {
    color: tomato;
  }
  .label {
      fill: red;
      transform: rotate(45deg);
      transform-origin: 100%;
  }
</style>
