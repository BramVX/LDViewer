import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Chart } from "react-google-charts";

function CardWithChart({chartType, data, x, y}) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="caption">{chartType}</Typography>
            <Typography variant="h4">{x} per {y}</Typography>
            <Chart
              chartType={chartType}
              data={data}
              legendToggle
            />
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