import * as d3 from 'd3';
import Chart from './Chart';

export default class Bars extends Chart {
    init() {
        const { chart, xAxis, yAxis, series, tooltip } = this.config;

        const { data } = series;
        const pointsNumber = data.length;

        const values = data.map(d => d.y);

        const domainMax = d3.max(values);
        const domainMin = d3.min(values) < 0 ? d3.min(values) : 0;

        const xScale = d3.scaleLinear()
            .domain([0, pointsNumber - 1])
            .range([0, this.width]);

        const yScale = d3.scaleLinear()
            .domain([domainMin, domainMax])
            .range([this.height, 0]);

        const line = d3.line()
            .x((d, i) => xScale(i)) // set the x values for the line generator
            .y(d => yScale(d.y)) // set the y values for the line generator
            .curve(d3.curveMonotoneX); // apply smoothing to the line

        const container = d3.select(this.container)
            .append('svg')
            .attr('width', chart.width)
            .attr('height', chart.height);

        const plot = container.append('g')
            .classed('plot', true)
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

        plot.append('path')
            .datum(data) // 10. Binds data to the line
            .attr('class', 'line') // Assign a class for styling
            .attr('d', line); // 11. Calls the line generator

        const dots = plot.selectAll('circle')
            .data(data)
            .enter().append('circle') // Uses the enter().append() method
            .attr('class', 'dot') // Assign a class for styling
            .attr('cx', (d, i) => xScale(i))
            .attr('cy', d => yScale(d.y))
            .attr('r', 5);

        if (tooltip) {
            // Define the div for the tooltip
            const div = d3.select(this.container).append('div')
                .classed(tooltip.className, tooltip.className)
                .style('opacity', 0);

            this.showTooltip = (d, i) => {
                console.log(tooltip.formatLabel(d));
                dots.style('cursor', 'pointer');
                div.transition()
                    .style('opacity', 0.9);
                div.html(tooltip.formatLabel ? tooltip.formatLabel(d) : d.y)
                    .style('left', `${xScale(i) - this.margin.left}px`)
                    .style('top', `${yScale(d.y) - 40}px`);
            };

            this.hideTooltip = () => {
                div.transition()
                    .duration(500)
                    .style('opacity', 0);
            };
        }

        dots.on('mouseover', this.showTooltip)
            .on('mouseleave', this.hideTooltip);


        if (xAxis) {
            this.x = d3.scaleBand()
                .range([0, this.width])
                .domain(data.map(d => d[xAxis.labelKey]));

            this.xAxis = d3.axisBottom(this.x)
                .scale(this.x)
                .tickSizeOuter(0);

            this.xAxis.tickArguments([20, 's']);

            container.append('g')
                .attr('class', 'xAxis')
                .attr('transform', `translate(${this.margin.left},${this.margin.top + this.height})`)
                .call(this.xAxis)
                .selectAll('text')
                .attr('dx', '-.8em')
                .attr('dy', '.15em')
                .classed(xAxis.labelClass, xAxis.labelClass);

            if (xAxis.title) {
                container.append('text')
                    .attr('y', this.height + this.margin.bottom)
                    .attr('x', this.margin.left + (this.width / 2))
                    .attr('dy', '1em')
                    .style('text-anchor', 'middle')
                    .text(xAxis.title);
            }
        }

        if (yAxis) {
            const yAxisScale = d3.scaleLinear()
                .domain([domainMin, domainMax])
                .range([this.height, 0]);

            container.append('g')
                .attr('transform', `translate(${this.margin.left},${this.margin.top})`)
                .call(d3.axisLeft(yAxisScale))
                .classed(yAxis.labelClass, yAxis.labelClass);

            if (yAxis.title) {
                container.append('text')
                    .attr('transform', 'rotate(-90)')
                    .attr('y', 0)
                    .attr('x', 0 - (this.height / 2))
                    .attr('dy', '1em')
                    .style('text-anchor', 'middle')
                    .text(yAxis.title);
            }
        }
    }
}
