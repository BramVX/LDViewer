import { Alert, AlertColor, Box, Button, Collapse, IconButton, Menu, MenuItem } from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CloseIcon from '@mui/icons-material/Close';
import React from "react";

function DashboardLayoutBasic({dashboardService}) {
    const [active, setActive] = React.useState(false);
    const [severity, setSeverity] = React.useState<AlertColor>("error");
    const [message, setMessage] = React.useState("Something went wrong with making the link.");

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null); 
    };

    function exportDataAsFile() {
        if (dashboardService.exportDashboardAsFile()) {
            setSeverity("success");
            setMessage("The file has been downloaded.");
            setActive(true);
        } else{
            setSeverity("error");
            setMessage("Something went wrong with making the file.");
            setActive(true);
        }
    }

    function exportDataAsLink() {
        if (dashboardService.exportDashboardAsLink()) {
            setSeverity("success");
            setMessage("The link has been copied to clipboard.");
            setActive(true);
        } else{
            setSeverity("error");
            setMessage("Too much data to export as link.");
            setActive(true);
        }
    }

    return (
        <>
        <Collapse in={active}>
            <Alert severity={severity}
                action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setActive(false);
                    }}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
                }
            sx={{ mb: 2 }}
            >
            {message}
            </Alert>
        </Collapse>
        <Button color="inherit"
            startIcon={<FileDownloadIcon />}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            Export
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={exportDataAsLink}>As link</MenuItem>
            <MenuItem onClick={exportDataAsFile}>As file</MenuItem>
        </Menu>
        </>
    )
}

export default DashboardLayoutBasic;