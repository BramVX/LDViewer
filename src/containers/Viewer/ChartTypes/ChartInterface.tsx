interface ChartStrategy {
    chartType: string;

    getChartType(): string;

    getDataOptions(): string[]

    formatData(bindings): any;

    buildQuery(values) : string;
}

