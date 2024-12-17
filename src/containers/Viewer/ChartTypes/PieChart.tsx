class PieChartStrategy implements ChartStrategy {
    chartType: string = "PieChart";
    dataOptions: string[] = ["text", "numeric"];

    getChartType(): string {
        return this.chartType;
    }

    getDataOptions(): string[] {
        return this.dataOptions;
    }

    formatData(bindings: any) {
        const formattedData = [];
        for (const [ key, value ] of bindings) {
            if(formattedData.length <= 0){
                formattedData.push([key[0].value, value[0].value])
            }
            formattedData.push([key[1].value, parseInt(value[1].value)])
        }
        return formattedData;
    }
}

export default PieChartStrategy;