export default class GeoChartStrategy implements ChartStrategy {
    chartType: string = "GeoChart";
    dataOptions: string[] = ["point/geo", "optional data", "optional data", "optional data"];

    getChartType(): string {
        return this.chartType;
    }

    getDataOptions(): string[] {
        return this.dataOptions;
    }

    formatData(bindings) {
        const formattedData = []
        for (const [ key, value ] of bindings) {
            const [longitude, latitude] = key[1].value.slice(6, -1).split(" ");
                formattedData.push([longitude, latitude])
        }
        return formattedData;
    }

    //point, data1,data2,data3
    buildQuery(values: any): string {

        var query = "SELECT ?geo ";

        for(let i = 1; i < values.length; i++){
            if(values[i].trim() !== ""){
                console.log("value", values[i])
                const title = values[i].split("/").pop
                query+="?"+title+" ";
            }
        }
      
        query += `
          WHERE {
            ?o <https://schema.org/geo> ?geo ;`;
        
        for(let i = 1; i < values.length; i++){
            if(values[i].trim() !== ""){
                const source = values[i];
                const title = source.split("/").pop
                query+=`
                <`+source+`> ?`+title+`;`;
            }
        }

        query+="}";

        if(values[1].trim() !== ""){
            const title = values[1].split("/").pop
            query+=`
                }
                ORDER BY ASC(?`+title+`)
                limit 5`;
        }
      
        console.log("Query that was made: ", query);
      
        return query;
    }
    
}