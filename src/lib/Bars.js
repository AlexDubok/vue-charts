import * as d3 from 'd3';
import Chart from './Chart';

export default class Bars extends Chart {
    init() {
        const { chart, xAxis, series } = this.config;
        const barWidth = chart.barWidth || this.width / series.data.length;

        const { data } = series;
        const values = data.map(d => d.y);
        const domainMax = d3.max(values);
        const domainMin = d3.min(values) < 0 ? d3.min(values) : 0;


        const y = d3.scaleLinear()
            .domain([domainMin, domainMax])
            .range([0, this.height]);

        const container = d3.select(this.container)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);

        // apply styles to chart container
        if (chart.style) {
            Object.keys(chart.style).forEach(key =>
                container.style(key, chart.style[key])
            );
        }

        const plot = container.append('g')
            .classed('plot', true);


        bars.selectAll('rect')
            .data(data)
            .enter().append('rect')
            .attr('height', d => y(d.y))
            .attr('width', barWidth - 1)
            .attr('x', (d, i) => i * barWidth)
            .attr('y', d => this.height - y(d.y))
            .attr('fill', (d, i) => d.color ? d.color : d3.schemeCategory20c[i % 20]);

        if (xAxis) {
            this.x = d3.scaleOrdinal()
                .domain(xAxis.labels)
                .range(0, this.width);

            this.xAxis = d3.axisBottom()
                .scale(this.x);

            container.append('g')
                .attr('class', 'x axis')
                .attr('transform', `translateY(${this.height})`)
                .call(this.xAxis);
        }

        // if (this.config.dataLabels) {
        //     console.log('DATALABELS');
        //     const { dataLabels } = this.config;
        //     bars.append('text')
        //         .attr('x', (d, i) => i * barWidth)
        //         .attr('y', height - 300)
        //         .text(d => d[dataLabels.labelKey])
        //         .classed('label', true);
        // }
    }
}
