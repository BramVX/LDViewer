import { NumericDataTypes } from "../Data/DatatypeEnum";
import ChartStrategy from "./ChartInterface";

class BarChartStrategy extends ChartStrategy {
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

  checkChartOptions(chartOptions: any): boolean {
    console.log("chartOptions", chartOptions);

    const firstDatatype = chartOptions[0][1].split("#")[1];
    const secondDatatype = chartOptions[1][1];

    // Chartoption 1 is of any value but numeric
    if (!Object.values(NumericDataTypes).includes(firstDatatype.toLowerCase())) {
      if (secondDatatype == null) {
        return false;
      } else {
        if (Object.values(NumericDataTypes).includes(secondDatatype.split("#")[1].toLowerCase())) {
          return true;
        } 
      }
    }
    return false;
  }

  chartOptionsWarning(): string {
    return "To create a barchart you need two values, the first one must be a textual value and the second one a numeric value";
  }
}

export default BarChartStrategy;
