import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { Chart, GoogleChartWrapperChartType } from "react-google-charts";
import Button from '@mui/material/Button/Button';

import CustomModal from './components/Modal/Modal';
import ChartData, { fetchChartData } from './Query';
import QueryBuilder from './QueryBuilder';
import CardWithChart from './components/CardWithChart';

export default function ChartContainer(){
    const [cards, setCards] = React.useState([]);
    const modalRef = React.useRef(null);
    const [chartOptions, setChartOptions] = React.useState(null);

    const handleAddChart = (options) =>{
      setChartOptions(options);
      AddChartToDashboard(options);
    }

    React.useEffect(() => {
        const content = LoadContent();
        setCards(content);
    }, []);

    const openModal = () => {
      if (modalRef.current) {
        modalRef.current.openModal(); 
      }
    };

    /*
    const addChartToDashboard = async (xOption, yOption, chartType, source) => {
      console.log(`Adding chart with X: ${xOption}, Y: ${yOption}, Type: ${chartType}`);

      const card = (
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="caption">{chartType}</Typography>
            <Typography variant="h4">{xOption.split("/").pop()} per {yOption.split("/").pop()}</Typography>
            <ChartData onDataFetched={handleFetchedData} query={QueryBuilder(chartType, xOption, yOption)} source={source} chartType={chartType}/>
            <Chart
              chartType={chartType}
              data={chartData}
              legendToggle
            />
          </CardContent>
        </Card>
      </Grid>
      );
      

      console.log("Does data exist before adding it to cards:", chartData)
      setCards((currentCards) => [...currentCards, card]);
    }
      */

    async function AddChartToDashboard({xOption, yOption, chartType, source}){
      const queryresult = await fetchChartData(QueryBuilder(chartType, xOption, yOption), source,  chartType);
      setCards((currentCards) => [...currentCards, 
        <CardWithChart chartType={chartType} data={queryresult} x={xOption.split("/").pop()} y={yOption.split("/").pop()} />
      ]);

      LoadContent();
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
      [
        "buyer",
        "price"
      ],
      [
        "H.A.O. Steenmeyer-Peters",
        2750
      ],
      [
        "A. Verboon",
        4100
      ],
      [
        "A. Verboon",
        4100
      ],
      [
        "J.M. Tesser",
        4300
      ],
      [
        "A. Verboon",
        4900
      ],
      [
        "A. Verboon",
        4900
      ],
      [
        "J.M. Jacobs",
        5800
      ],
      [
        "J.M. Jacobs",
        5800
      ],
      [
        "F.G. Evers",
        6000
      ],
      [
        "F.G. Evers",
        6200
      ]
    ]

    // Add key-value pairs to the hashmap
    cardMap.set("PieChart", pieDataTable);
    cardMap.set("BarChart", barChartTable);

    //TESTROW DELETE LATER
    cards.push(
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="caption">YES</Typography>
            <Typography variant="h4">FAKE.</Typography>
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
            <Typography variant="h4">FAKE</Typography>
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
            <CustomModal onAddChart={handleAddChart}></CustomModal>
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