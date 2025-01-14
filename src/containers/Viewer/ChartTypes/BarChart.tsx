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
    if (
      firstDatatype !== "xsd:integer" &&
      firstDatatype !== "xsd:decimal" &&
      firstDatatype !== "xsd:float" &&
      firstDatatype !== "xsd:double"
    ) {
      if (secondDatatype == null) {
        false;
      } else {
        if (
          secondDatatype.split("#")[1] == "integer" ||
          secondDatatype.split("#")[1] == "decimal" ||
          secondDatatype.split("#")[1] == "float" ||
          secondDatatype.split("#")[1] == "double" ||
          secondDatatype.split("#")[1] == "nonNegativeInteger"
        ) {
          return true;
        } else {
          return false;
        }
      }

      return true;
    }

    return false;
  }

  chartOptionsWarning(): string {
    return "To create a barchart you need two values, the first one must be a textual value and the second one a numeric value";
  }
}

export default BarChartStrategy;
