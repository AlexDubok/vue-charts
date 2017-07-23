import * as d3 from 'd3';
import Chart from './Chart';

export default class Bars extends Chart {
    init() {
        const { chart, series, tooltip } = this.config;
        const { data, labelKey, labelClass } = series;

        const radius = Math.min(this.width, this.height) / 2;

        const arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        const labelArc = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);

        const pie = d3.pie()
            .sort(null)
            .value(d => d.y);

        const container = d3.select(this.container)
            .append('svg')
            .attr('width', chart.width)
            .attr('height', chart.height);

        const plot = container.append('g')
            .classed('pie-plot', true)
            .attr('transform', `translate(${this.width / 2},${this.height / 2})`);


        const sector = plot.selectAll('.arc')
            .data(pie(data))
            .enter().append('g');

        sector.append('path')
            .attr('d', arc)
            .style('fill', (d, i) => d.color ? d.color : d3.schemeCategory20[i % 20]);

        sector.append('text')
            .attr('transform', d => `translate(${labelArc.centroid(d)})`)
            .attr('dy', '.35em')
            .text(d => d.data.y < 2 ? '' : d.data[labelKey])
            .classed(labelClass, labelClass);

        if (tooltip) {
            // Define the div for the tooltip
            const div = d3.select(this.container).append('div')
                .classed(tooltip.className, tooltip.className)
                .style('opacity', 0);

            this.showTooltip = (d) => {
                const position = labelArc.centroid(d);

                sector.style('cursor', 'pointer');
                div.transition()
                    .style('opacity', 0.9);
                div.html(tooltip.formatLabel ? tooltip.formatLabel(d.data) : d.data.y)
                    .style('left', `${(this.width / 2) + position[0]}px`)
                    .style('top', `${(this.height / 2) + position[1]}px`);
            };

            this.hideTooltip = () => {
                div.transition()
                    .duration(500)
                    .style('opacity', 0);
            };
        }

        sector.on('mouseover', this.showTooltip)
            .on('mouseleave', this.hideTooltip);
    }
}
