export default class Chart {
    constructor(container, config) {
        if (!container) throw new Error('[container] required');
        this.container = container;
        this.config = config;
        this.width = config.chart.width || 600;
        this.height = config.chart.height || 480;
    }
}
