import { QueryEngine } from "@comunica/query-sparql";
import React from "react";

interface QueryProps {
    query: string;
    source: string;
    chartStrategy: ChartStrategy;
}

const chartData = ({query, source, chartStrategy}) => {

        React.useEffect(() => {
            const fetchData = async () => {
            try{
                let formattedData = [];
                const bindings = await executeQuery(query, source);

                console.log("Bindings: ", bindings);
        
                if(bindings.length > 0){
                    /*
                    const xAxisLabel = Object.keys(bindings[0])[0];
                    const yAxisLabel = Object.keys(bindings[0])[1];
                    */

                    //formattedData.push([bindings.keys.name,bindings.values.name]);

                    console.log(bindings);

                    formattedData = chartStrategy.formatData(bindings);

                    console.log(formattedData);
                    /*

                    bindings.forEach(item => {
                        formattedData.push([item[xAxisLabel].value, parseInt(item[yAxisLabel].value, 10)]);
                    });
                    */
                   return formattedData;
                }
                } catch(error){
                    console.error("Failed to fetch data", error);
                }
            };

            fetchData();
         }, [query, source, chartStrategy]);

         return null;
}

async function fetchChartData(query, source, chartStrategy){
    console.log("the strat used for fetch and format:", chartStrategy.getChartType());
    const bindings = await executeQuery(query, source);
    if(bindings.length > 0){
        return chartStrategy.formatData(bindings)
    }
    return null;
}

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
        console.log("bindings to string:",bindings.toString());
        return bindings;
    } else {
        const { data } = await myEngine.resultToString(result, "application/sparql-results+json");
        data.pipe(process.stdout);
    }
}

export default chartData;
export { executeQuery, fetchChartData };