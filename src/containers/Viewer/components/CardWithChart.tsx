import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CustomTabPanel from "./CustomTabPanel";
import QueryField from "./QueryField";
import CustomModal from "./Modal/CustomModal";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Visualization from "./Visualization";
import LeafletAdapter from "../Visualization/LeafletAdapter";
import GoogleChartsAdapter from "../Visualization/GoogleChartsAdapter";
import PopupModal from "./Modal/CustomVisualizationModal";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface CardWithChartProps {
  dataset: string;
  chartType: any;
  chartData: any;
  title: string;
  query: string;
  onEditChart: any;
  onEditQuery: any;
  onDeleteChart: any;
  id: number;
}

const CardWithChart: React.FC<CardWithChartProps> = ({
  dataset,
  chartType,
  chartData,
  title,
  query,
  onEditChart,
  onEditQuery,
  onDeleteChart,
  id,
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleQuerySubmit = (newQuery) => {
    onEditQuery({ newQuery, id });
    setValue(0);
  };

  let adapter;

  if (chartType === "GeoChart") {
    adapter = new LeafletAdapter(chartData);
  } else {
    adapter = new GoogleChartsAdapter(chartData, { chartType: chartType });
  }

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4">{title}</Typography>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label={chartType} {...a11yProps(0)} />
              <Tab label="Query" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <div style={{ position: "relative" }}>
            <CustomTabPanel value={value} index={0}>
              <PopupModal adapter={adapter} />
              <Visualization adapter={adapter} />
            </CustomTabPanel>
          </div>
          <CustomTabPanel value={value} index={1}>
            <QueryField query={query} onSubmit={handleQuerySubmit} />
          </CustomTabPanel>
          <CustomModal
            dataset={dataset}
            onUpdate={onEditChart}
            id={id}
          ></CustomModal>
          <Button
            onClick={() => onDeleteChart(id)}
            variant="contained"
            endIcon={<RemoveCircleOutlineIcon />}
          >
            Delete chart
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CardWithChart;
