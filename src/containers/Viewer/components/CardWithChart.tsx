import React, { useState } from 'react';
import { Box, Card, CardContent, Tab, Tabs, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Chart } from "react-google-charts";
import CustomTabPanel from './CustomTabPanel';
import QueryField from './QueryField';

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
}

const CardWithChart: React.FC<CardWithChartProps> = ({chartType, data, x, y, query}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
          </CardContent>
        </Card>
      </Grid>
  );
}
/*
function CardList() {
  const [cards, setCards] = useState([]);

  const addCard = (title, subtitle, charttype, data) => {
    setCards([...cards, <CardContentComponent key={cards.length} title={title} subtitle={subtitle} charttype={charttype} data={data} />]);
  };

  return (
    <div>
      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.key}>
            {card}
          </Grid>
        ))}
      </Grid>
      <button onClick={addCard}>Add Card</button>
    </div>
  );
}
  */

export default CardWithChart;