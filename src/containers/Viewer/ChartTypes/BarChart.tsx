class BarChartStrategy implements ChartStrategy {
  chartType: string = "BarChart";
  dataOptions: string[] = ["text", "numeric"];

  getChartType(): string {
    return this.chartType;
  }

  getDataOptions(): string[] {
    return this.dataOptions;
  }

  formatData(bindings) {
    console.log(bindings[0]);
    const formattedData = [];
    for (const [key, value] of bindings) {
      if (formattedData.length <= 0) {
        formattedData.push([key[0].value, value[0].value]);
      }
      formattedData.push([key[1].value, parseFloat(value[1].value)]);
    }
    return formattedData;
  }
}

export default BarChartStrategy;
