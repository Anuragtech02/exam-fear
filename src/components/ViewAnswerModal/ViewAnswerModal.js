import React from "react";
import styles from "./ViewAnswerModal.module.css";
import ReactMarkdown from "react-markdown";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";

const ViewAnswerModal = ({ markdown, open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Answer"}</DialogTitle>
      <DialogContent>
        <div className={styles.container}>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewAnswerModal;
