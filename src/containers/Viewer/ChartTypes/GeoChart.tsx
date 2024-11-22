export default class GeoChartStrategy implements ChartStrategy {
    chartType: string = "GeoChart";
    dataOptions: string[] = ["text", "numeric"];

    getChartType(): string {
        return this.chartType;
    }

    getDataOptions(): string[] {
        return this.dataOptions;
    }

    formatData(bindings) {
        const formattedData = []
        for (const [ key, value ] of bindings) {
            if(formattedData.length <= 0){
                formattedData.push(["longitude", "latitude"])
            }
            const [longitude, latitude] = key[1].value.slice(6, -1).split(" ");
                formattedData.push([latitude, longitude])
        }
        return formattedData;
    }

    buildQuery(values: any): string {
        return "not implemented";
    }
    
}