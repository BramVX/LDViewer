import { GeoDataTypes } from "../Data/DatatypeEnum";
import ChartStrategy from "./ChartInterface";

class GeoChartStrategy extends ChartStrategy {
  chartType: string = "GeoChart";
  dataOptions: string[] = [
    "point/geo",
    "optional data",
    "optional data",
    "optional data",
  ];

  getChartType(): string {
    return this.chartType;
  }

  getDataOptions(): string[] {
    return this.dataOptions;
  }

  formatData(bindings) {
    const formattedData = [];
    const pattern = /Point \(([-+]?\d*\.?\d+) ([-+]?\d*\.?\d+)\)/;

    console.log(bindings);

    for (const [geo, optional1, optional2, optional3] of bindings) {
      if (formattedData.length <= 0) {
        const subjects = ["lat", "long"];
        if (optional1) subjects.push(optional1[0].value);
        if (optional2) subjects.push(optional2[0].value);
        if (optional3) subjects.push(optional3[0].value);
        formattedData.push(subjects);
      }
      const match = geo[1].value.match(pattern);
      const values = [match[1], match[2]];
      if (optional1) values.push(optional1[1].value);
      if (optional2) values.push(optional2[1].value);
      if (optional3) values.push(optional3[1].value);
      formattedData.push(values);
    }
    return formattedData;
  }

  checkChartOptions(chartOptions: any): boolean {
    const firstDatatype = chartOptions[0][1].split("#")[1];

    console.log(chartOptions[0][1]);

    if (
      Object.values(GeoDataTypes).includes(firstDatatype.toLowerCase()) ||
      Object.values(GeoDataTypes).includes(
        chartOptions[0][1].split("/").pop().substring(0, 3).toLowerCase()
      )
    ) {
      return true;
    }
    return false;
  }

  chartOptionsWarning(): string {
    return "The first option must be a geo point datatype. The rest are optional";
  }

  buildQuery(values: any): string {
    return super.buildQuery(values);
  }
}

export default GeoChartStrategy;
