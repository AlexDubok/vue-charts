<template>
  <div>
    <h2>{{msg}}</h2>
    <div ref='chart'></div>
  </div>
</template>

<script>
import Bars from '../lib/Bars';

export default {
    name: 'hello',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        };
    },
    mounted() {
        // `this` points to the vm instance
        const chart = this.$refs.chart;

        const config = {
            data  : [4, 8, 15, 16, 23, 42],
            width : 600,
            height: 600,
            style : {
                border: '2px solid tomato'
            }
        };
        const barChart = new Bars(chart, config);
        barChart.init();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h2 {
    color: tomato;
  }
</style>
