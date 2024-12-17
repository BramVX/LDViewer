import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';

import CustomModal from '../components/Modal/CustomModal';
import { fetchChartData } from '../Data/DataService';
import CardWithChart from '../components/CardWithChart';
import chartStrategies from '../ChartTypes/ChartStrategies';
import SPARQLBuilder from '../Data/SPARQLBuilder';

const DynamicDashboardContainer = ({dataset, cards, setCards}) => {

    React.useEffect(() =>{
      localStorage.setItem("cards", JSON.stringify(cards));
    }, [cards]);

    async function AddChartToDashboard({chartOptions, chartStrategy, source}){
      const chartType = chartStrategy.getChartType();
      let sparqlBuilder = new SPARQLBuilder();
      const query = sparqlBuilder.buildQuery(chartOptions);
      const queryresult = await fetchChartData( query, source,  chartStrategy);
      const x = chartOptions[0].split("/").pop();
      const y = chartOptions[1].split("/").pop();
      const id = cards ? JSON.parse(localStorage.getItem("cards")).length : 0;

      const newCard = { chartType, queryresult, x, y, query, id, source};

      if(cards != null){
        setCards([...cards, newCard]);
      }else{
        setCards([newCard]);
      }
    }

    async function EditChartInDashboard({chartOptions, chartStrategy, source, id}){
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
        setCards(updatedCards);
      }
    }

    async function EditChartWithQuery({newQuery, id}){
      const updatedCards = [...cards];
      const chartStrategy = chartStrategies[updatedCards[id].chartType];
      const queryresult = await fetchChartData( newQuery, updatedCards[id].source,  chartStrategy);
      updatedCards[id].query = newQuery;
      updatedCards[id].queryresult = queryresult;
      setCards(updatedCards);
    }


    const DeleteChartFromDashboard = (id: number) => {
      if(id!=null){
        const updatedCards = [...cards];
        for (let i = id; i < updatedCards.length - 1; i++){
          updatedCards[i + 1].id = i;
          updatedCards[i] = updatedCards[i + 1];
        }
        updatedCards.pop();
        setCards(updatedCards);
      }
    }

  const AddButton = () => {
    return(
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h4"></Typography>
            <CustomModal dataset={dataset} onUpdate={AddChartToDashboard} id={null}></CustomModal>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
        {cards != null && cards.map((items) => {
          return (
              <CardWithChart chartType={items.chartType} chartData={items.queryresult} x={items.x} y={items.y} query={items.query} onEditChart={EditChartInDashboard} onEditQuery={EditChartWithQuery} onDeleteChart={DeleteChartFromDashboard} id={items.id}/>
          );
        })}
      <AddButton/>
    </Grid>
  );
}

export default DynamicDashboardContainer;