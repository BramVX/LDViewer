import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import React from "react";
import Grid from '@mui/material/Grid2';

const CardWithText = ({ title, text, image }) => {
    const gridSize = title === "Importing a dashboard" || title === "Exporting a dashboard" 
        ? { xs: 12, sm: 6, md: 6 } // Full width for this specific title
        : { xs: 12, sm: 6, md: 4 }; // Default size
    return (
    <Grid size={gridSize}>
        <Card variant="outlined">
            <CardMedia
                sx={{ height: 140, objectFit: 'contain' }}
                component="img"
                image={image}
                title={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {text}
                </Typography>
            </CardContent>
        </Card>
    </Grid>
    );
};

export default CardWithText;