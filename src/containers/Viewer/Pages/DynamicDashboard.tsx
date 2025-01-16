import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

import CustomModal from "../components/Modal/CustomModal";
import CardWithChart from "../components/CardWithChart";
import DashboardService from "../Data/DashboardService";
import ContentContainer from "../components/ContentContainer";
import DashboardToolbar from "../components/DashboardToolbar";
import { Add } from "@mui/icons-material";

const DynamicDashboard = ({ cards, setCards }) => {
  const [dataset, setDataset] = React.useState(localStorage.getItem("dataset"));

  const dashboardService = React.useMemo(() => {
    const service = new DashboardService(cards, setCards);
    service.setDataset(dataset);
    return service;
  }, [cards, setCards, dataset]);

  const handleDatasetChange = (newDataset) => {
    setDataset(newDataset);
    dashboardService.setDataset(newDataset);
    localStorage.setItem("dataset", newDataset);
  };

  React.useEffect(() => {
    console.log(cards);
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  async function AddChartToDashboard({ title, chartOptions, chartStrategy, source }) {
    await dashboardService.addChart({ title, chartOptions, chartStrategy, source });
  }

  async function EditChartInDashboard({
    title,
    chartOptions,
    chartStrategy,
    source,
    id,
  }) {
    await dashboardService.editChart({
      title,
      chartOptions,
      chartStrategy,
      source,
      id,
    });
  }

  async function EditChartWithQuery({ newQuery, id }) {
    await dashboardService.editChartWithQuery({ newQuery, id });
  }

  const DeleteChartFromDashboard = (id: number) => {
    dashboardService.deleteChart({ id });
  };

  console.log("right before custommodal", dashboardService);

  const AddButton = () => {
    return (
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h4"></Typography>
            <CustomModal
              dataset={dataset}
              onUpdate={AddChartToDashboard}
              id={null}
            ></CustomModal>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <DashboardToolbar
        onDatasetChange={handleDatasetChange}
        dashboardService={dashboardService}
      />
      <ContentContainer>
        <Grid container spacing={2}>
          {cards != null &&
            cards.map((items) => {
              return (
                <CardWithChart
                  dataset={items.source}
                  chartType={items.chartType}
                  chartData={items.queryresult}
                  title={items.title}
                  query={items.query}
                  onEditChart={EditChartInDashboard}
                  onEditQuery={EditChartWithQuery}
                  onDeleteChart={DeleteChartFromDashboard}
                  id={items.id}
                />
              );
            })}
          <AddButton />
        </Grid>
      </ContentContainer>
    </>
  );
};

export default DynamicDashboard;
