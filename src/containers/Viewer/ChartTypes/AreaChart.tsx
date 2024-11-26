export default class AreaChartStrategy implements ChartStrategy {
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
        const formattedData = []
        for (const [ key, value ] of bindings) {
            if(formattedData.length <= 0){
                formattedData.push([key[0].value, value[0].value])
            }
            formattedData.push([parseInt(key[1].value), parseInt(value[1].value)])
        }
        console.log(formattedData);
        return formattedData;
    }

    buildQuery(values: any): string {

        console.log("To query with:", values)
        let query = "";

        //Check of er een # inzit

        //Maak er daarna een prefix van
        let prefixes = [];
        let selectObjects = [];
        let whereObjects = [];

        /*
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX rotterdam: <http://www.semanticweb.org/prins600/ontologies/2019/5/untitled-ontology-35#>

        SELECT * WHERE {
            ?o rotterdam:bouwjaar ?bouwjaar ;
                rotterdam:brutovloeroppervlak ?x ;
                rotterdam:zalen ?y .
        } LIMIT 10
        */

        
        for(let i = 0; i < values.length; i++){
            //Check if it has a # inside
            if (values[i].includes("#")){
                const split = values[i].split("#");
                const prefixIndex = prefixes.indexOf(split[0] + "#");
                if (prefixIndex !== -1) {
                    //prefix exists already
                    const existingValue = prefixes[prefixIndex] || [];
                    whereObjects.push(`pre${prefixIndex}:${split[1]} ?${split[1]};
                        `);
                    selectObjects.push(`?${split[1]} `);
                } else{
                    prefixes.push(split[0] + "#");
                    whereObjects.push(`pre${prefixes.length-1}:${split[1]} ?${split[1]};
                        `);
                    selectObjects.push(`?${split[1]} `);
                }
            } else {
                console.log("value", values[i])
                const title = values[i].split("/").pop();
                selectObjects.push(`?${title} `);
            }
        }

        for (const [i, pr] of prefixes.entries()) {
            query += `PREFIX pre${i}: <${pr}>
            `;
        }
        
        query += "SELECT ";
        console.log("select",selectObjects);
        console.log("where",whereObjects);

        for (const so of selectObjects){
            query += so;
        }

        query += `
        WHERE {
            ?o `;

        for(const wo of whereObjects){
            query += wo;
        }

        query +=`
    }
        `

        console.log("Query that was made: ", query);
      
        return query;
    }
}