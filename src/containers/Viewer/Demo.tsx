import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { Chart } from "react-google-charts";
import Query from "./Query";
import ChartData from './Query';
import QueryBuilder from "./QueryBuilder";
import { BarChart } from '@mui/icons-material';

export default function PageContent() {
  const [chartData, setChartData] = React.useState([]);

  //add arguments for title and extra text
  const handleFetchedData = (data) => {
    setChartData(data);
  }

  var barsource = "https://api.data.pldn.nl/datasets/GeoDataWizard/verkaufsbuchernijmegen/services/verkaufsbuchernijmegen/sparql";
  var geosource = "https://api.data.pldn.nl/datasets/GeoDataWizard/stolpersteinenijmegen/services/stolpersteinenijmegen/sparql";

  const data = [
    ["Task", "Hours per Day"],
    ["Work", 9],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];

  const options = {
    title: "My Daily Activities",
  };

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="caption">From titanic on pldn</Typography>
            <Typography variant="h4">BarChart</Typography>
            <ChartData onDataFetched={handleFetchedData} query={QueryBuilder("BarChart")} source={barsource} chartType="BarChart"/>
            <Chart chartType='BarChart' data={chartData} />
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="caption">From dataset on pldn</Typography>
            <Typography variant="h4">GeoChart</Typography>
            <ChartData onDataFetched={handleFetchedData} query={QueryBuilder("GeoChart")} source={geosource} chartType="GeoChart"/>
            <Chart chartType='GeoChart' data={chartData} options={{displayMode: "markers"}}/>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="caption">Baseless</Typography>
            <Typography variant="h4">PieChart</Typography>
            <Chart chartType='PieChart' data={data} options={options}/>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="caption">Baseless</Typography>
            <Typography variant="h4">BarChart</Typography>
            <Chart
              chartType='BarChart'
              data={[
                ["Age", "Weight"],
                [4, 16],
                [8, 25],
                [12, 40],
                [16, 55],
                [20, 70],
              ]}
              options={{
                title: "Average Weight by Age",
              }}
              legendToggle
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
