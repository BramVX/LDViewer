/*
function App() {
    const data = [
      ["Task", "Hours per Day"],
      ["Work", 9],
      ["Eat", 2],
      ["Commute", 2],
      ["Watch TV", 2],
      ["Sleep", 7],
    ];
  
    const options = {
      title: "My Daily Activities",
    };
    return (
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    );
  }
    */

//Data should be string with number
export default class PieChartStrategy implements ChartStrategy {
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

    buildQuery(values: any): string {
        return "not implemented";
    }
}
  