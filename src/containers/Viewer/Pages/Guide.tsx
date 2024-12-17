import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import React from "react";
import DatasetIcon from '@mui/icons-material/Dataset';
import Grid from '@mui/material/Grid2';
import CustomModal from "../components/Modal/CustomModal";
import { fetchChartData } from "../Data/DataService";
import SPARQLBuilder from "../Data/SPARQLBuilder";
import CardWithChart from "../components/CardWithChart";
import chartStrategies from "../ChartTypes/ChartStrategies";
import LinkDataSetImage from "../../../config/assets/LinkDataSetImage.png";
import AddVisualizationImage from "../../../config/assets/AddVisualizationImage.png";
import DeleteVisualizationImage from "../../../config/assets/DeleteVisualizationImage.png";
import EditVisualizationImage from "../../../config/assets/EditVisualizationImage.png";
import EditQueryImage from "../../../config/assets/EditQueryImage.png";
import ExportImage from "../../../config/assets/ExportImage.png";
import ImportImage from "../../../config/assets/ImportImage.png";
import CardWithText from "../components/CardWithText";

const Welcome = ({dataset}) => {
    const [card, setCard] = React.useState(null);

    async function AddChartToDashboard({chartOptions, chartStrategy, source}){
        const chartType = chartStrategy.getChartType();
        let sparqlBuilder = new SPARQLBuilder();
        const query = sparqlBuilder.buildQuery(chartOptions);
        const queryresult = await fetchChartData( query, source,  chartStrategy);
        const x = chartOptions[0].split("/").pop();
        const y = chartOptions[1].split("/").pop();
        const id = 0;
  
        const newCard = { chartType, queryresult, x, y, query, id, source};
  
        setCard(newCard);
    }

    async function EditChartInDashboard({chartOptions, chartStrategy, source, id}){
        const chartType = chartStrategy.getChartType();
        let spqb = new SPARQLBuilder();
        const query = spqb.buildQuery(chartOptions);
        const queryresult = await fetchChartData( query, source,  chartStrategy);
        const x = chartOptions[0].split("/").pop();
        const y = chartOptions[1].split("/").pop();
        const editedCard = {chartType, queryresult, x, y, query, id, source};
  
        setCard(editedCard);
      }
  
      async function EditChartWithQuery({newQuery}){
        const chartStrategy = chartStrategies[card.chartType];
        const queryresult = await fetchChartData( newQuery, card.source,  chartStrategy);
        card.query = newQuery;
        card.queryresult = queryresult;
        setCard(card);
      }
  
  
      const DeleteChartFromDashboard = () => {
        setCard(null);
      }

    return (
        <>
        <Grid container spacing={2}>
        <CardWithText
            title="Linking a dataset to the dashboard"
            text="To link a dataset to the dashboard you can click the square dataset icon in the top of this dashboard screen. Once clicked you get a request to fill in a SPARQL endpoint URL. You can find this SPARQL endpoint at the place you have published it. In the cover image you can see an example for data.pldn.nl.
            You can try it out now by pasting in: https://api.data.pldn.nl/datasets/bram/test/sparql"
            image={LinkDataSetImage}
        />
        <CardWithText
            title="Adding a visualization"
            text="To add a visualization to the dashboard you can click the 'Add visualization' button at the bottom of a 'card'. Once clicked you will see a modal asking you to fill in a type of visualization and the topics you want. Try it out with the dataset linked above. You can fill in name and fare for the topics and choose a BarChart as visualization type."
            image={AddVisualizationImage}
        />
        {card ? (
                <CardWithChart dataset={dataset} chartType={card.chartType} chartData={card.queryresult} x={card.x} y={card.y} query={card.query} onEditChart={EditChartInDashboard} onEditQuery={EditChartWithQuery} onDeleteChart={DeleteChartFromDashboard} id={card.id}/>
        ) : (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h4"></Typography>
            <CustomModal dataset={dataset} onUpdate={AddChartToDashboard} id={null}></CustomModal>
          </CardContent>
        </Card>
        )}
        <CardWithText 
            title="Deleting a visualization"
            text="With the delete button beneath the visualization you can delete the visualization from the dashboard. Try it out by deleting the visualization you just added."
            image={DeleteVisualizationImage}
        />
        <CardWithText 
            title="Editing a visualization"
            text="With the edit button beneath the visualization you will see the same dialog as when adding a visualization. You can change the type of visualization or the topics you want to see. Try it out by changing the charttype to piechart."
            image={EditVisualizationImage}
        />
        <CardWithText 
            title="Editing a query"
            text="With the query tab you can edit the query that is used to fetch the data. You can change the query to get different data. Try it out for example by changing the limit of the query to 20. When done you can click submit and then navigate with the tab to the chart."
            image={EditQueryImage}
        />
        <CardWithText 
            title="Exporting a dashboard"
            text="To export a dashboard you can click the download button in the top right corner of the screen. You can choose to export the dashboard as a JSON file or as a link. This file can be imported in another dashboard."
            image={ExportImage}
        />
        <CardWithText 
            title="Importing a dashboard"
            text="To import a dashboard you can click the import button in the top right corner of the screen. You will have to choose from a file on your computer. This will import the dashboard in the current dashboard. To import via link you just have to go to the link."
            image={ImportImage}
        />
        </Grid>
        </>
    );
}

export default Welcome;