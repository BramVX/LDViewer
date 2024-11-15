import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';

import CustomModal from './components/Modal/Modal';
import ChartData, { fetchChartData } from './Query';
import QueryBuilder from './QueryBuilder';
import CardWithChart from './components/CardWithChart';

const ChartContainer = ({cards, setCards}) => {
    const handleAddChart = (options) =>{
      AddChartToDashboard(options);
    }

    React.useEffect(() =>{
      localStorage.setItem("cards", JSON.stringify(cards));
    }, [cards]);

    async function AddChartToDashboard({xOption, yOption, chartType, source}){
      const query = QueryBuilder(chartType, xOption, yOption);
      const queryresult = await fetchChartData( query, source,  chartType);
      const x = xOption.split("/").pop();
      const y = yOption.split("/").pop();
      const newCard = { chartType, queryresult, x, y, query };

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

  const AddButton = () => {
    //Always push one card into the list with a button which leads to adding a new card
    console.log("Button gets added")
    return(
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h4"></Typography>
            <CustomModal onAddChart={handleAddChart}></CustomModal>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
        {cards != null && cards.map((items) => {
          return (
              <CardWithChart chartType={items.chartType} data={items.queryresult} x={items.x} y={items.y} query={items.query}/>
          );
        })}
      <AddButton/>
    </Grid>
  );
}

export default ChartContainer;