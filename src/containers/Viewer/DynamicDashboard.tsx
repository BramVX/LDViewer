import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';

import CustomModal from './components/Modal/CustomModal';
import { fetchChartData } from './Query';
import CardWithChart from './components/CardWithChart';

const DynamicDashboardContainer = ({cards, setCards}) => {

    React.useEffect(() =>{
      localStorage.setItem("cards", JSON.stringify(cards));
    }, [cards]);

    async function AddChartToDashboard({chartOptions, chartStrategy, source}){
      const chartType = chartStrategy.getChartType();
      const query = chartStrategy.buildQuery(chartOptions);
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
      const query = chartStrategy.buildQuery(chartOptions);
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
      const chartStrategy = { getChartType: () => updatedCards[id].chartType, buildQuery: () => newQuery };
      const queryresult = await fetchChartData( newQuery, updatedCards[id].source,  chartStrategy[updatedCards[id].chartType]);
      updatedCards[id].query = newQuery;
      updatedCards[id].queryresult = queryresult;
      setCards(updatedCards);
    }


    const DeleteChartFromDashboard = (id: number) => {
      if(id!=null){
        const updatedCards = [...cards];
        console.log(updatedCards.length);
        for (let i = id; i < updatedCards.length - 1; i++){
          updatedCards[i + 1].id = i;
          updatedCards[i] = updatedCards[i + 1];
        }
        updatedCards.pop();
        setCards(updatedCards);
      }
    }
/*
    function DeleteChartFromDashboard({id}){
      console.log("To Delete:",id);
      console.log("Old cards", cards);
      if(id!=null){
        const updatedCards = [...cards];
        for (let i = id; id < updatedCards.length; i++){
          updatedCards[i] = updatedCards[i + 1];
        }
        updatedCards.pop();
        console.log("New cards", updatedCards);
        setCards(updatedCards);
      }
    }
      */

  const AddButton = () => {
    //Always push one card into the list with a button which leads to adding a new card
    console.log("Button gets added")
    console.log("CARDS: ", cards)
    return(
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h4"></Typography>
            <CustomModal onUpdate={AddChartToDashboard} id={null}></CustomModal>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
        {cards != null && cards.map((items) => {
          console.log("loop: ", items, cards)
          return (
              <CardWithChart chartType={items.chartType} chartData={items.queryresult} x={items.x} y={items.y} query={items.query} onEditChart={EditChartInDashboard} onEditQuery={EditChartWithQuery} onDeleteChart={DeleteChartFromDashboard} id={items.id}/>
          );
        })}
      <AddButton/>
    </Grid>
  );
}

export default DynamicDashboardContainer;