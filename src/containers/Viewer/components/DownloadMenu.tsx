import { Alert, AlertColor, Box, Button, Collapse, IconButton, Menu, MenuItem } from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CloseIcon from '@mui/icons-material/Close';
import React from "react";

export default function DashboardLayoutBasic() {
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
        try {
            const file = new Blob([localStorage.getItem('cards')], {type: 'application/json'});
            const blobUrl = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'cards.json';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
            setSeverity("success");
            setMessage("The file has been downloaded.");
            setActive(true);
        } catch (error) {
            setSeverity("error");
            setMessage("Something went wrong with making the file.");
            setActive(true);
        }
    }

    function exportDataAsLink() {
        const data = window.btoa(JSON.stringify(localStorage.getItem('cards')));
        let url = window.location.href + "?data=" + data;
        if(url.length > 2048){
            setSeverity("error");
            setMessage("The URL is too long to be shared. Please export as file instead.");
            setActive(true);
            return;
        } else {
            setSeverity("success");
            setMessage("The URL has been copied to your clipboard.");
            setActive(true);
            navigator.clipboard.writeText(url);
        }
    }

    return (
        <>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
        </Box>
        
        </>
    )
}