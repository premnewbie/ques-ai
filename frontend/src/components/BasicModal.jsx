import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const BasicModal = ({ isOpen, handleClose, children }) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
        className="w-full md:w-3/4 lg:w-1/2 rounded-2xl"
      >
        {children}
      </Box>
    </Modal>
  );
};

export default BasicModal;
