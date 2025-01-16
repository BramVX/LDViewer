import { NumericDataTypes, TimeDataTypes } from "../Data/DatatypeEnum";
import ChartStrategy from "./ChartInterface";

class AreaChartStrategy extends ChartStrategy {
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
    const formattedData = [];
    for (const [key, value] of bindings) {
      if (formattedData.length <= 0) {
        formattedData.push([key[0].value, value[0].value]);
      }
      formattedData.push([parseInt(key[1].value), parseInt(value[1].value)]);
    }
    console.log(formattedData);
    return formattedData;
  }

  checkChartOptions(chartOptions: any): boolean {
    const firstDatatype = chartOptions[0][1].split("#")[1];
    const secondDatatype = chartOptions[1][1].split("#")[1];
    const thirdDatatype = chartOptions[2][1].split("#")[1];

    if(Object.values(TimeDataTypes).includes(firstDatatype.toLowerCase())){
      if(Object.values(NumericDataTypes).includes(secondDatatype.toLowerCase())){
        if(Object.values(NumericDataTypes).includes(thirdDatatype.toLowerCase())){
          return true;
        }
      }
      return true;
    }
    return false;
  }

  chartOptionsWarning(): string {
    return "The first option must be a year or integer datatype";
  }

  buildQuery(values: any): string {
    return super.buildQuery(values);
  }
}

export default AreaChartStrategy;
