import {
  Alert,
  AlertColor,
  Button,
  Collapse,
  IconButton,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

function DownloadMenu({ dashboardService }) {
  const [active, setActive] = React.useState(false);
  const [severity, setSeverity] = React.useState<AlertColor>("error");
  const [message, setMessage] = React.useState("");

  function exportDataAsFile() {
    if (dashboardService.exportDashboardAsFile()) {
      setSeverity("success");
      setMessage("The file has been downloaded.");
      setActive(true);
    } else {
      setSeverity("error");
      setMessage("Something went wrong with making the file.");
      setActive(true);
    }
  }

  return (
    <>
      <Collapse in={active}>
        <Alert
          severity={severity}
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
      <Button
        color="inherit"
        startIcon={<FileDownloadIcon />}
        onClick={exportDataAsFile}
      >
        Export
      </Button>
    </>
  );
}

export default DownloadMenu;
