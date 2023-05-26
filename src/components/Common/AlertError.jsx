import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { Typography, Button, IconButton } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@mui/icons-material/Error';

const useStyles = makeStyles(theme => ({
  dialogPaper: {
    width: "360px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  dialogTitle: {
    fontFamily: "Montserrat",
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: "1.2",
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
  dialogSubTitle: {
    fontFamily: "Montserrat",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "1.5",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(4),
    textAlign: "center"
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  button: {
    width: "130px",
    paddingBottom: theme.spacing(2)
  },
  cancelButton: {
    width: "130px",
    paddingBottom: theme.spacing(2)
  }
}));

const AlertError = ({ open, title, subTitle, onClose, message }) => {
  const classes = useStyles();
  console.log(message);

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={open}
      onClose={onClose}
    >
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <ErrorIcon color="error" fontSize="large" />
      <br/>
      <Typography className={classes.dialogTitle}>{message}</Typography>
      <Button
        color="secondary"
        onClick={onClose}
        className={classes.cancelButton}
      >
        Close
      </Button>
    </Dialog>
  );
};

export default AlertError;
