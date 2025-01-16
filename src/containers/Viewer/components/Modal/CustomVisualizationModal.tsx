import { Modal, IconButton } from "@mui/material";
import React from "react";
import Visualization from "../Visualization";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PopupModal = ({ adapter }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton sx={{zIndex: "100", position: "absolute", bottom: "10px", right: "10px"}} aria-label="Zoom" color="inherit" onClick={handleOpen}>
        <ZoomOutMapIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Visualization adapter={adapter} />
      </Modal>
    </div>
  );
};

export default PopupModal;
