import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';

import CustomModal from './components/Modal/CustomModal';
import ChartData, { fetchChartData } from './Query';
import QueryBuilder from './QueryBuilder';
import CardWithChart from './components/CardWithChart';

const ChartContainer = ({cards, setCards}) => {

    React.useEffect(() =>{
      localStorage.setItem("cards", JSON.stringify(cards));
    }, [cards]);

    async function AddChartToDashboard({xOption, yOption, chartType, source}){
      const query = QueryBuilder(chartType, xOption, yOption);
      const queryresult = await fetchChartData( query, source,  chartType);
      const x = xOption.split("/").pop();
      const y = yOption.split("/").pop();
      const id = cards ? JSON.parse(localStorage.getItem("cards")).length : 0;

      console.log("new ID: ", id)
      const newCard = { chartType, queryresult, x, y, query, id};

      if(cards != null){
        console.log("Not empty ",cards);
        setCards([...cards, newCard]);
        console.log("Not empty ",cards);
      }else{
        console.log("Is empty ", cards);
        setCards([newCard]);
        console.log("Is empty ", cards);
      }
    }

    async function EditChartInDashboard({xOption, yOption, chartType, source, id}){
      const query = QueryBuilder(chartType, xOption, yOption);
      const queryresult = await fetchChartData( query, source,  chartType);
      const x = xOption.split("/").pop();
      const y = yOption.split("/").pop();
      const editedCard = {chartType, queryresult, x, y, query, id};

      if(~id){
        const updatedCards = [...cards];
        updatedCards[id] = editedCard;
        setCards(updatedCards);
      }
      console.log("NEW CARDS AFTER EDIT ", cards);
    }


    const DeleteChartFromDashboard = (id: number) => {
      console.log("To Delete:",id);
      console.log("Old cards", cards);
      if(id!=null){
        const updatedCards = [...cards];
        console.log(updatedCards.length);
        for (let i = id; i < updatedCards.length - 1; i++){
          updatedCards[i + 1].id = i;
          updatedCards[i] = updatedCards[i + 1];
        }
        updatedCards.pop();
        console.log("New cards", updatedCards);
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
              <CardWithChart chartType={items.chartType} data={items.queryresult} x={items.x} y={items.y} query={items.query} onEditChart={EditChartInDashboard} onDeleteChart={DeleteChartFromDashboard} id={items.id}/>
          );
        })}
      <AddButton/>
    </Grid>
  );
}

export default ChartContainer;