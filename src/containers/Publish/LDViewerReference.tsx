import React from "react"
import { Card, CardHeader, Typography, CardContent, Button, CardActions } from "@mui/material"

const LDViewerReference = () => {

  function openLDViewer() {
    window.location.href = window.location.href.split("/")[0] + "/ldviewer";
  }

  return(
    <Card variant="outlined">
        <CardHeader
          title={<Typography variant="h5">View your data in the LDViewer</Typography>}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Once your data is published to TriplyDB and set to public, you can view it in the LDViewer.
            The LDViewer is a tool that allows you to explore Linked Data in a user-friendly way. It helps you visualize and explore your Linked Data. 
            Please copy the SPARQL endpoint url of your published dataset to be able to use it later in the LDViewer.
          </Typography>
          
        </CardContent>
        <CardActions>
          <Button size="small" onClick={openLDViewer}>Take me there</Button>
        </CardActions>
      </Card>
    );
}

export default LDViewerReference;