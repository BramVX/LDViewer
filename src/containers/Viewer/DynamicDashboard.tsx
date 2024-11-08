import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { Chart, GoogleChartWrapperChartType } from "react-google-charts";
import Button from '@mui/material/Button/Button';
import AddIcon from '@mui/icons-material/Add';
import CustomModal from './components/Modal/Modal';
import ChartData from './Query';
import QueryBuilder from './QueryBuilder';

export default function ChartContainer(){
    const [cards, setCards] = React.useState<JSX.Element[]>([]);
    const modalRef = React.useRef(null);
    const [chartData, setChartData] = React.useState();

    const handleFetchedData = (data) => {
      setChartData(data);
    }

    React.useEffect(() => {
        const content = LoadContent();
        setCards(content);
    }, []);

    const openModal = () => {
      if (modalRef.current) {
        modalRef.current.openModal(); // Calls handleOpen in CustomModal
      }
    };

    const addChartToDashboard = async (xOption, yOption, chartType, source) => {
      console.log(`Adding chart with X: ${xOption}, Y: ${yOption}, Type: ${chartType}`);

      const card = (
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="caption">{chartType}</Typography>
            <Typography variant="h4">{xOption.split("/").pop()} per {yOption.split("/").pop()}</Typography>
            <ChartData onDataFetched={handleFetchedData} query={QueryBuilder(chartType, xOption, yOption)} source={source} chartType={chartType}/>
            {chartData ? (
            <Chart
              chartType={chartType}
              data={chartData}
              legendToggle
            />
            ) : (<Typography>LOADING</Typography>)
            }
          </CardContent>
        </Card>
      </Grid>
      );

      console.log("Does data exist before adding it to cards:", chartData)
      setCards((currentCards) => [...currentCards, card]);
    }

function LoadContent() {

    //Laad localstorage als die er is

    const cardMap = new Map()

    const pieDataTable = [
        ["Task", "Hours per Day"],
        ["Work", 9],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7],
      ];

    const barChartTable = [
        ["Age", "Weight"],
        [4,16],
        [8,25],
        [12,40],
        [16,55],
        [20,70]
    ]

    // Add key-value pairs to the hashmap
    cardMap.set("PieChart", pieDataTable);
    cardMap.set("BarChart", barChartTable);
    
    const cards = [];

    //TESTROW DELETE LATER
    cards.push(
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="caption">YES</Typography>
            <Typography variant="h4">W.I.P.</Typography>
            <Chart
              chartType="PieChart"
              data={[
                ["Task", "Hours per Day"],
                ["Work", 9],
                ["Eat", 2],
                ["Commute", 2],
                ["Watch TV", 2],
                ["Sleep", 7],
              ]}
              legendToggle
            />
          </CardContent>
        </Card>
      </Grid>
    );

    cardMap.forEach((value: (string | number)[][], key: GoogleChartWrapperChartType) => {
        console.log(key, value);
        cards.push(
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="caption">{key}</Typography>
            <Typography variant="h4">W.I.P.</Typography>
            {value ? (
            <Chart
              chartType={key}
              data={value}
              legendToggle
            />
            ) : (<p>Loading...</p>)}
          </CardContent>
        </Card>
      </Grid>
        );
    });

    //Always push one card into the list with a button which leads to adding a new card
    cards.push(
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h4"></Typography>
            <Button onClick={openModal} variant="contained" endIcon={<AddIcon/>}>
            Add new chart
            </Button>
            <CustomModal ref={modalRef} addChartToDashboard={addChartToDashboard}/>
          </CardContent>
        </Card>
      </Grid>
    );

    return cards;
}

  return (
    <Grid container spacing={3}>
        {cards}
    </Grid>
  );
}

function addCardMenu(){
    //Display a pop-up screen
    //Ask for chart type
    //Show valuenames from chosen dataset

}

function addCard(){
    //Add card to list
    //Reload the list and show
    //Save current setup to localstorage
}
