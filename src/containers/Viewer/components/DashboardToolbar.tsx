import styled from "@emotion/styled";
import { IconButton, Button, Tooltip, AppBar, Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import React from "react";
import DownloadMenu from "./DownloadMenu";
import DatasetLinkedIcon from '@mui/icons-material/DatasetLinked';
import DatasetIcon from '@mui/icons-material/Dataset';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const DashboardToolbar = ({ dashboardService }) => {

    const [dataset, setDataset] = React.useState(localStorage.getItem('dataset'));
    const [refreshKey, setRefreshKey] = React.useState(0);
    const [color, setColor] = React.useState<"success" | "info" | "warning" | "error" | "default" | "inherit" | "primary" | "secondary">("warning");
    const [tooltip, setTooltip] = React.useState("Link a dataset");
  
    const checkDataset = async () => {
      if (dataset) {
        console.log("Starting dataset check...");
        setColor("warning");
        setTooltip("Checking dataset...");
        const isReachable = await dashboardService.dataService.checkDataset(dataset);
        if (isReachable) {
            console.log("Dataset is reachable2");
            setColor("success");
            setTooltip(`${dataset} is linked.`);
        } else {
            console.log("Dataset is not reachable2");
            setColor("error");
            setTooltip("Dataset is not reachable.");
        }
    }
    };

    React.useEffect(() => {
      checkDataset();
    } ,[dataset, refreshKey]);

    const VisuallyHiddenInput = styled('input')({
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: 1,
      overflow: 'hidden',
      position: 'absolute',
      bottom: 0,
      left: 0,
      whiteSpace: 'nowrap',
      width: 1,
    });
    
    function linkDataset() {
        const url = prompt("Please enter SPARQL endpoint URL of the dataset to link and leave empty to unlink:");
        if (url) {
          setDataset(url);
          setRefreshKey((prev) => prev + 1);
        } else{
          localStorage.removeItem('dataset');
          setDataset(null);
          setColor("warning");
          setTooltip("Link a dataset");
        }
      }

      return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    sx={{ mr: 2 }}
                >
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                    Dashboard
                </Typography>
                <Tooltip title={tooltip}>
                  <IconButton color={color} onClick={linkDataset}>
                    {
                        dataset ? <DatasetLinkedIcon /> : <DatasetIcon />
                    }
                  </IconButton>
                </Tooltip>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <DownloadMenu dashboardService={dashboardService} />
                    <Button startIcon={<CloudUploadIcon />} color="inherit" component="label"
                        role={undefined}
                        tabIndex={-1}>
                        Import
                        <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => dashboardService.importDashboard(event.target.files)}
                        />
                    </Button>
                </Box>
                </Toolbar>
            </AppBar>
            </Box>
      );

};

export default DashboardToolbar;