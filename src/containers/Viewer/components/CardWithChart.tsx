import React from 'react';
import { Box, Card, CardContent, Tab, Tabs, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Chart } from "react-google-charts";
import CustomTabPanel from './CustomTabPanel';
import QueryField from './QueryField';
import CustomModal from './Modal/CustomModal';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface CardWithChartProps {
  chartType: any;
  data: any;
  x: string;
  y: string;
  query: string;
  onEditChart: any;
  id: number;
}

const CardWithChart: React.FC<CardWithChartProps> = ({chartType, data, x, y, query, onEditChart, id}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  console.log("THE ID: ", id);

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h4">{x} per {y}</Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label={chartType} {...a11yProps(0)} />
                <Tab label="Query" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
            <Chart
                chartType={chartType}
                data={data}
                legendToggle
            />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <QueryField query={query} />
            </CustomTabPanel>
            <CustomModal onUpdate={onEditChart} id={id}></CustomModal>
          </CardContent>
        </Card>
      </Grid>
  );
}

export default CardWithChart;