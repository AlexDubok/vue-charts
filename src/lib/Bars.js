import * as d3 from 'd3';
import Chart from './Chart';

export default class Bars extends Chart {
    init() {
        const { chart, xAxis, yAxis, series, tooltip } = this.config;
        const margin = {
            top   : 20,
            right : 20,
            bottom: 100,
            left  : 70,
            ...chart.margin
        };
        const width = chart.width - margin.right - margin.left;
        const height = chart.height - margin.top - margin.bottom;
        const barWidth = chart.barWidth || width / series.data.length;

        const { data } = series;
        const values = data.map(d => d.y);
        const domainMax = d3.max(values);
        const domainMin = d3.min(values) < 0 ? d3.min(values) : 0;

        const y = d3.scaleLinear()
            .domain([domainMin, domainMax])
            .range([0, height]);

        const container = d3.select(this.container)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);

        const plot = container.append('g')
            .classed('plot', true)
            .attr('transform', `translate(${margin.left},${margin.top})`);

        if (tooltip) {
            // Define the div for the tooltip
            const div = d3.select(this.container).append('div')
                .classed(tooltip.className, tooltip.className)
                .style('opacity', 0);

            this.showTooltip = (d) => {
                plot.style('cursor', 'pointer');
                div.transition()
                    .style('opacity', 0.9);
                div.html(tooltip.formatLabel ? tooltip.formatLabel(d) : d.y)
                    .style('left', `${d3.event.pageX}px`)
                    .style('top', `${height - y(d.y) - 40}px`);
            };

            this.hideTooltip = () => {
                div.transition()
                    .duration(500)
                    .style('opacity', 0);
            };
        }

        plot.selectAll('rect')
            .data(data)
            .enter().append('rect')
            .attr('height', d => y(d.y))
            .attr('width', barWidth - 1)
            .attr('x', (d, i) => i * barWidth)
            .attr('y', d => height - y(d.y))
            .attr('fill', (d, i) => d.color ? d.color : d3.schemeCategory20c[i % 20])
            .on('mouseover', this.showTooltip)
            .on('mouseleave', this.hideTooltip);

        if (xAxis) {
            this.x = d3.scaleBand()
                .range([0, width])
                .domain(data.map(d => d[xAxis.labelKey]));

            this.xAxis = d3.axisBottom(this.x)
                .scale(this.x)
                .tickSizeOuter(0);

            this.xAxis.tickArguments([20, 's']);

            container.append('g')
                .attr('class', 'xAxis')
                .attr('transform', `translate(${margin.left},${margin.top + height})`)
                .call(this.xAxis)
                .selectAll('text')
                .attr('dx', '-.8em')
                .attr('dy', '.15em')
                .classed(xAxis.labelClass, xAxis.labelClass);

            if (xAxis.title) {
                container.append('text')
                    .attr('y', height + margin.bottom)
                    .attr('x', margin.left + (width / 2))
                    .attr('dy', '1em')
                    .style('text-anchor', 'middle')
                    .text(xAxis.title);
            }
        }

        if (yAxis) {
            const yAxisScale = d3.scaleLinear()
                .domain([domainMin, domainMax])
                .range([height, 0]);

            container.append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`)
                .call(d3.axisLeft(yAxisScale))
                .classed(yAxis.labelClass, yAxis.labelClass);

            if (yAxis.title) {
                container.append('text')
                    .attr('transform', 'rotate(-90)')
                    .attr('y', 0)
                    .attr('x', 0 - (height / 2))
                    .attr('dy', '1em')
                    .style('text-anchor', 'middle')
                    .text(yAxis.title);
            }
        }
    }
}
