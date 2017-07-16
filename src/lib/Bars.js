import * as d3 from 'd3';
import Chart from './Chart';

export default class Bars extends Chart {
    init() {
        const { width, height, data } = this.config;
        const barWidth = this.config.barWidth || width / data.length;

        const y = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, height]);

        console.log('y:', d3.scaleOrdinal('red')(15));

        const chart = d3.select(this.container)
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        // apply styles for chart container
        Object.keys(this.config.style).forEach(key =>
            chart.style(key, this.config.style[key])
        );

        const plot = chart.append('g')
            .classed('plot', true);

        plot.selectAll('rect')
            .data(data)
            .enter().append('rect')
            .attr('height', (d) => {
                console.log(y(d));

                return y(d);
            })
            .attr('width', barWidth - 1)
            .attr('x', (d, i) => i * barWidth)
            .attr('y', d => height - y(d))
            .attr('fill', d3.scaleOrdinal(d3.schemeCategory20c));
    }
}
