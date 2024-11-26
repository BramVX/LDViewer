export default class BarChartStrategy implements ChartStrategy {
    chartType: string = "BarChart";
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
                formattedData.push([key[0].value, value[0].value])
            }
            formattedData.push([key[1].value, parseInt(value[1].value)])
        }
        return formattedData;
    }

    buildQuery(values) : string{
        var x = values[0].split("/").pop();
        var y = values[1].split("/").pop();
      
        var query = `SELECT ?`+x+` ?`+y+` 
          WHERE {
            ?o <`+values[0]+`> ?`+x+` ;
            <`+values[1]+`> ?`+y+` 
          }
          ORDER BY ASC(?`+y+`)
          limit 5`;
      
        console.log("Query that was made: ", query);
      
        return query;
      }
}