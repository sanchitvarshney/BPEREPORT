// components/Toaster.jsx
import React from "react";
import { Snackbar, Alert } from "@mui/material";

const MuiToaster = ({ message, severity = "info", open, duration = 3000, onClose }) => {
  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Always center
    >
      <Alert variant="filled" onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MuiToaster;
