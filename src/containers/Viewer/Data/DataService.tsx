import { QueryEngine } from "@comunica/query-sparql";
import React from "react";
import ChartStrategy from "../ChartTypes/ChartInterface";

interface QueryProps {
    query: string;
    source: string;
    chartStrategy: ChartStrategy;
}

class DataService{

    chartData({query, source, chartStrategy}){
        React.useEffect(() => {
            const fetchData = async () => {
            try{
                let formattedData = [];
                const bindings = await this.executeQuery(query, source);
                if(bindings.length > 0){
                    formattedData = chartStrategy.formatData(bindings);
                    console.log(formattedData);
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

    async fetchChartData(query, source, chartStrategy){
        const bindings = await this.executeQuery(query, source);
        if(bindings.length > 0){
            return chartStrategy.formatData(bindings)
        }
        return null;
    }

    async executeQuery(query, source) {
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

    async checkDataset(url, retryCount = 3): Promise<boolean> {
        const query = `SELECT DISTINCT ?predicate {
            ?s ?predicate ?o
        } ORDER BY ?predicate`;
  
        const attemptQuery = async (remainingRetries): Promise<boolean> => {
            try {
                await this.executeQuery(query, url);
                localStorage.setItem('dataset', url);
                console.log("Dataset is reachable");
                return true;
            } catch (error) {
                if (remainingRetries > 0) {
                    // Wrap the recursive call in a Promise that delays execution
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                    return attemptQuery(remainingRetries - 1);
                } else {
                    localStorage.setItem('dataset', url);
                    console.log("Dataset is not reachable");
                    return false;
                }
            }
        };
        return attemptQuery(retryCount);
    }
}

export default DataService;