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
                if(bindings.length > 0){
                    formattedData = chartStrategy.formatData(bindings);
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
    const bindings = await executeQuery(query, source);
    if(bindings.length > 0){
        return chartStrategy.formatData(bindings)
    }
    return null;
}

async function executeQuery(query, source) {
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
        return bindings;
    } else {
        const { data } = await myEngine.resultToString(result, "application/sparql-results+json");
        data.pipe(process.stdout);
    }
}

export default chartData;
export { executeQuery, fetchChartData };