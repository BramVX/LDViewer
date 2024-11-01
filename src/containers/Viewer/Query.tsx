import { QueryEngine } from "@comunica/query-sparql";
import { exec } from "child_process";
import React from "react";


const chartData = ({onDataFetched, query, source, chartType}) => {
        React.useEffect(() => {
            const fetchData = async () => {
            try{
                const formattedData = [];
                const bindings = await executeQuery(query, source);

                console.log("Bindings: ", bindings);
        
                if(bindings.length > 0){
                    /*
                    const xAxisLabel = Object.keys(bindings[0])[0];
                    const yAxisLabel = Object.keys(bindings[0])[1];
                    */

                    //formattedData.push([bindings.keys.name,bindings.values.name]);

                    console.log(bindings);


                    for (const [ key, value ] of bindings) {
                        console.log(value[1].value)
                        console.log(value[1].termType)

                        if(chartType == "GeoChart"){
                            if(formattedData.length <= 0){
                                formattedData.push(["longitude", "latitude"])
                            }
                            const [longitude, latitude] = key[1].value.slice(6, -1).split(" ");
                            formattedData.push([longitude, latitude])
                        }else if (chartType == "BarChart"){
                            if(formattedData.length <= 0){
                                formattedData.push([key[0].value, value[0].value])
                            }
                            formattedData.push([key[1].value, parseInt(value[1].value)])
                        }

                        //Different strategies for different charttypes:
                        //Barchart(string and int):
                        //formattedData.push([key[1].value, parseInt(value[1].value)])
                        //Geochart(point and html):
                        //formattedData.push([key[1].value], value[1].value)
                    }

                    console.log(formattedData);
                    /*

                    bindings.forEach(item => {
                        formattedData.push([item[xAxisLabel].value, parseInt(item[yAxisLabel].value, 10)]);
                    });
                    */
        
                    onDataFetched(formattedData);
                }
                } catch(error){
                    console.error("Failed to fetch data", error);
                }
            };

            fetchData();
         }, [query, source, chartType]);

         return null;
}

export default chartData;

async function executeQuery(query, source) {
    console.log("Executing...");
    const myEngine = new QueryEngine();

    const result = await myEngine.query(query, 
        {sources: [
            {
                type: 'sparql',
                value: source
            }
        ]}
    );

    if (result.resultType === "bindings") {
        const bindingsStream = await result.execute();
        const bindings = await bindingsStream.toArray();
        console.log(bindings.toString());
        return bindings;
    } else {
        const { data } = await myEngine.resultToString(result, "application/sparql-results+json");
        data.pipe(process.stdout);
    }
}