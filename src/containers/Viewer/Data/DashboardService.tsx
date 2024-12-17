import React from 'react';
import { fetchChartData } from './DataService';
import SPARQLBuilder from './SPARQLBuilder';
import chartStrategies from '../ChartTypes/ChartStrategies';

class DashboardService  {
    async addChart({chartOptions, chartStrategy, source, cards}){
        const chartType = chartStrategy.getChartType();
        let sparqlBuilder = new SPARQLBuilder();
        const query = sparqlBuilder.buildQuery(chartOptions);
        const queryresult = await fetchChartData( query, source,  chartStrategy);
        const x = chartOptions[0].split("/").pop();
        const y = chartOptions[1].split("/").pop();
        const id = cards ? JSON.parse(localStorage.getItem("cards")).length : 0;
  
        const newCard = { chartType, queryresult, x, y, query, id, source};
  
        cards.push(newCard)
        return [...cards];
    }

    async editChart({chartOptions, chartStrategy, source, id, cards}){
        const chartType = chartStrategy.getChartType();
        let spqb = new SPARQLBuilder();
        const query = spqb.buildQuery(chartOptions);
        const queryresult = await fetchChartData( query, source,  chartStrategy);
        const x = chartOptions[0].split("/").pop();
        const y = chartOptions[1].split("/").pop();
        const editedCard = {chartType, queryresult, x, y, query, id, source};
  
        if(~id){
          const updatedCards = [...cards];
          updatedCards[id] = editedCard;
          return updatedCards;
        }
    }

    async editChartWithQuery({newQuery, id, cards}){
        const updatedCards = [...cards];
        const chartStrategy = chartStrategies[updatedCards[id].chartType];
        const queryresult = await fetchChartData( newQuery, updatedCards[id].source,  chartStrategy);
        updatedCards[id].query = newQuery;
        updatedCards[id].queryresult = queryresult;
        return updatedCards;
    }

    deleteChart({id, cards}){
        if(id!=null){
          const updatedCards = [...cards];
          for (let i = id; i < updatedCards.length - 1; i++){
            updatedCards[i + 1].id = i;
            updatedCards[i] = updatedCards[i + 1];
          }
          updatedCards.pop();
          return updatedCards;
        }
    }
}

export default DashboardService;