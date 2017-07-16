import * as d3 from 'd3';
import Chart from './Chart';

export default class Bars extends Chart {
    init() {
        const { width, height, data } = this.config;
        const barWidth = this.config.barWidth || width / data.length;
        const scaleRange = data.reduce((max, current) => Math.max(max, current.y), 0);

        const y = d3.scaleLinear()
            .domain([0, scaleRange])
            .range([0, height - 20]);

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

        const bar = plot.selectAll('g')
            .data(data)
            .enter().append('g');

        bar.append('rect')
            .attr('height', d => y(d.y))
            .attr('width', barWidth - 1)
            .attr('x', (d, i) => i * barWidth)
            .attr('y', d => height - y(d.y))
            .attr('fill', d3.scaleOrdinal(d3.schemeCategory20c));


        if (this.config.dataLabels) {
            console.log('DATALABELS');
            const { dataLabels } = this.config;
            bar.append('text')
                .attr('x', (d, i) => i * barWidth)
                .attr('y', height - 300)
                .text(d => d[dataLabels.labelKey])
                .classed('label', true);
        }
    }
}
