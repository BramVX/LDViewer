import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';

import CustomModal from '../components/Modal/CustomModal';
import CardWithChart from '../components/CardWithChart';
import DashboardService from '../Data/DashboardService';
import DataService from '../Data/DataService';
import ContentContainer from '../components/ContentContainer';
import DashboardToolbar from '../components/DashboardToolbar';

const DynamicDashboard = ({dataset, cards, setCards}) => {
    const dashboardService = new DashboardService(cards, setCards);

    React.useEffect(() =>{
      console.log(cards);
      console.log
      localStorage.setItem("cards", JSON.stringify(cards));
    }, [cards]);

    async function AddChartToDashboard({chartOptions, chartStrategy, source}){
      await dashboardService.addChart({chartOptions, chartStrategy, source});
    }

    async function EditChartInDashboard({chartOptions, chartStrategy, source, id}){
      await dashboardService.editChart({chartOptions, chartStrategy, source, id});
    }

    async function EditChartWithQuery({newQuery, id}){
      await dashboardService.editChartWithQuery({newQuery, id});
    }

    const DeleteChartFromDashboard = (id: number) => {
      dashboardService.deleteChart({id});
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
    <>
    <DashboardToolbar dashboardService={dashboardService}/>
    <ContentContainer>
    <Grid container spacing={2}>
      {cards != null && cards.map((items) => {
        return (
          <CardWithChart dataset={dataset} chartType={items.chartType} chartData={items.queryresult} x={items.x} y={items.y} query={items.query} onEditChart={EditChartInDashboard} onEditQuery={EditChartWithQuery} onDeleteChart={DeleteChartFromDashboard} id={items.id} />
        );
      })}
      <AddButton />
    </Grid>
    </ContentContainer>
    </>
  );
}

export default DynamicDashboard;