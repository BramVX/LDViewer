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

    async function AddChartToDashboard({chartOptions, chartStrategy, source}){
      const chartType = chartStrategy.getChartType();
      console.log("options in dynamicdashboard", chartOptions);
      const query = chartStrategy.buildQuery(chartOptions);
      console.log(chartStrategy);
      const queryresult = await fetchChartData( query, source,  chartStrategy);
      const x = chartOptions[0].split("/").pop();
      const y = chartOptions[1].split("/").pop();
      const id = cards ? JSON.parse(localStorage.getItem("cards")).length : 0;

      console.log("new ID: ", id)
      const newCard = { chartType, queryresult, x, y, query, id};

      if(cards != null){
        setCards([...cards, newCard]);
      }else{
        setCards([newCard]);
      }
    }

    async function EditChartInDashboard({xOption, yOption, chartStrategy, source, id}){
      const chartType = chartStrategy.getChartType();
      const query = chartStrategy.buildQuery([xOption, yOption]);
      const queryresult = await fetchChartData( query, source,  chartStrategy);
      const x = xOption.split("/").pop();
      const y = yOption.split("/").pop();
      const index = id;
      const editedCard = {chartType, queryresult, x, y, query, id};

      if(~index){
        const updatedCards = [...cards];
        updatedCards[index] = editedCard;
        setCards(updatedCards);
      }
      console.log("NEW CARDS AFTER EDIT ", cards);
    }

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
              <CardWithChart chartType={items.chartType} data={items.queryresult} x={items.x} y={items.y} query={items.query} onEditChart={EditChartInDashboard} id={items.id}/>
          );
        })}
      <AddButton/>
    </Grid>
  );
}

export default ChartContainer;