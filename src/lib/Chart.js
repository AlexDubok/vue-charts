export default class Chart {
    constructor(container, config) {
        if (!container) throw new Error('[container] required');
        const { chart } = config;
        this.container = container;
        this.config = config;

        this.margin = {
            top   : 20,
            right : 20,
            bottom: 100,
            left  : 70,
            ...chart.margin
        };

        this.width = (chart.width - this.margin.right - this.margin.left) || 600;
        this.height = (chart.height - this.margin.top - this.margin.bottom) || 480;
    }
}
