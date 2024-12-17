class GeoChartStrategy implements ChartStrategy {
    chartType: string = "GeoChart";
    dataOptions: string[] = ["point/geo", "optional data", "optional data", "optional data"];

    getChartType(): string {
        return this.chartType;
    }

    getDataOptions(): string[] {
        return this.dataOptions;
    }

    formatData(bindings) {
        const formattedData = []
        for (const [ key, value ] of bindings) {
            const [longitude, latitude] = key[1].value.slice(6, -1).split(" ");
                formattedData.push([longitude, latitude])
        }
        return formattedData;
    }
}

export default GeoChartStrategy;