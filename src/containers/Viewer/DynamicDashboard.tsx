import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import { Chart, GoogleChartWrapperChartType } from "react-google-charts";
import Button from '@mui/material/Button/Button';
import AddIcon from '@mui/icons-material/Add';

export default function ChartContainer(){
    const [rows, setRows] = React.useState<JSX.Element[]>([]);

    React.useEffect(() => {
        const content = LoadContent();
        setRows(content);
    }, []);
    
    const [googleLoaded, setGoogleLoaded] = React.useState(false);

    React.useEffect(() =>{
        const loadGoogle = () => {
            const google = window.google;
            if (google) {
                google.load("visualization", "1", { packages: ["corechart"]});
                google.setOnLoadCallback(() =>{
                    setGoogleLoaded(true);
                });
            }
        };

        loadGoogle();
    }, []);

    React.useEffect(() => {
        if(googleLoaded){
            const content = LoadContent();
            setRows(content);
        }
    }, [googleLoaded]);
    

function LoadContent() {

    //Laad localstorage als die er is

    const cardMap = new Map()

    /*
    const pieDataTable = new google.visualization.DataTable({
        cols: [{id: 'task', label: 'Task', type: 'string'},
               {id: 'hours', label: 'Hours per Day', type: 'number'}],
        rows: [{c:[{v: 'Work'}, {v: 11}]},
               {c:[{v: 'Eat'}, {v: 2}]},
               {c:[{v: 'Commute'}, {v: 2}]},
               {c:[{v: 'Watch TV'}, {v:2}]},
               {c:[{v: 'Sleep'}, {v:7, f:'7.000'}]}]
        }, 0.6);
    
    const barChartTable = new google.visualization.DataTable(
        {
            cols: [{id: 'age', label: 'Age', type: 'number'},
                {id: 'weight', label:'Weight', type: 'number'}
            ],
            rows: [{c:[{v: 4}, {v:16}]},
            {c:[{v: 8}, {v:25}]},
            {c:[{v: 12}, {v:40}]},
            {c:[{v: 16}, {v:55}]},
            {c:[{v: 20}, {v:70}]},
            ]
        });
    */
    

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
    
    const rows = [];

    //TESTROW DELETE LATER
    rows.push(
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
        rows.push(
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
    rows.push(
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h4"></Typography>
            <Button onClick={addCardMenu} variant="contained" endIcon={<AddIcon/>}>
            Add new chart
            </Button>
          </CardContent>
        </Card>
      </Grid>
    );

    return rows;
}

  return (
    <Grid container spacing={3}>
        {rows}
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
