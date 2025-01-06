class AreaChartStrategy implements ChartStrategy {
    chartType: string = "AreaChart";
    dataOptions: string[] = ["year", "numeric", "numeric"];

    getChartType(): string {
        return this.chartType;
    }

    getDataOptions(): string[] {
        return this.dataOptions;
    }

    //Year as number on x
    //Value as number on y
    //Second y value as number
    formatData(bindings: any) {
        const formattedData = []
        for (const [ key, value ] of bindings) {
            if(formattedData.length <= 0){
                formattedData.push([key[0].value, value[0].value])
            }
            formattedData.push([parseInt(key[1].value), parseInt(value[1].value)])
        }
        console.log(formattedData);
        return formattedData;
    }
}

export default AreaChartStrategy;