import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';

import CustomModal from '../components/Modal/CustomModal';
import CardWithChart from '../components/CardWithChart';
import DashboardService from '../Data/DashboardService';

const DynamicDashboardContainer = ({dataset, cards, setCards}) => {
    const dashboardService = new DashboardService();

    React.useEffect(() =>{
      console.log(cards);
      console.log("Setting cards");
      localStorage.setItem("cards", JSON.stringify(cards));
    }, [cards]);

    async function AddChartToDashboard({chartOptions, chartStrategy, source}){
      const updatedCards = await dashboardService.addChart({chartOptions, chartStrategy, source, cards});
      console.log(updatedCards);
      setCards([...updatedCards]);
    }

    async function EditChartInDashboard({chartOptions, chartStrategy, source, id}){
      const updatedCards = await dashboardService.editChart({chartOptions, chartStrategy, source, id, cards});
      setCards(updatedCards);
    }

    async function EditChartWithQuery({newQuery, id}){
      const updatedCards = await dashboardService.editChartWithQuery({newQuery, id, cards});
      setCards(updatedCards);
    }


    const DeleteChartFromDashboard = (id: number) => {
      const updatedCards = dashboardService.deleteChart({id, cards});
      setCards(updatedCards);
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
              <CardWithChart dataset={dataset} chartType={items.chartType} chartData={items.queryresult} x={items.x} y={items.y} query={items.query} onEditChart={EditChartInDashboard} onEditQuery={EditChartWithQuery} onDeleteChart={DeleteChartFromDashboard} id={items.id}/>
          );
        })}
      <AddButton/>
    </Grid>
  );
}

export default DynamicDashboardContainer;