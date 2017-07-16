export default class Chart {
    constructor(container, config) {
        if (!container) throw new Error('[container] required');
        this.container = container;
        this.config = {
            ...config,
            width : config.width || 420,
            height: config.height,
            data  : config.data || []
        };
    }
}
