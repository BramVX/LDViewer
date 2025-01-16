import { NumericDataTypes } from "../Data/DatatypeEnum";
import ChartStrategy from "./ChartInterface";

class PieChartStrategy extends ChartStrategy {
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

    //Chartoption 1 is of any value but numeric
    if (
      !Object.values(NumericDataTypes).includes(firstDatatype.toLowerCase())
    ) {
      if (secondDatatype == null) {
        return true;
      } else {
        if (
          Object.values(NumericDataTypes).includes(
            secondDatatype.split("#")[1].toLowerCase()
          )
        ) {
          return true;
        }
      }
    }
    return false;
  }

  chartOptionsWarning(): string {
    return "To create a piechart you either have only the first option which contains a textual value or also add a second value which must be a numeric value";
  }

  buildQuery(values: any): string {
    let query = "";

    if (values[1]) {
      query = super.buildQuery(values);
    } else {
      let firstValue = values[0][0];
      let selectObject;
      let whereObject;

      if (firstValue.includes("#")) {
        const split = firstValue.split("#");
        const prefix = split[0] + "#";

        selectObject = `?${split[1]}`;
        whereObject = `pre:${split[1]} ?${split[1]};`;

        query += `
                PREFIX pre:<${prefix}> 
                `;
      } else {
        selectObject = `?${firstValue.split("/").pop()}`;
        whereObject = `<${firstValue}> ?${firstValue.split("/").pop()};`;
      }
      query +=
        "SELECT " + selectObject + " (COUNT(" + selectObject + ") AS ?count) ";
      query += `
            WHERE {
                ?o ${whereObject}
            }
            group by ${selectObject}
            limit  1000
            `;
      console.log("was made with the one value");
    }
    console.log("query", query);
    return query;
  }
}

export default PieChartStrategy;
