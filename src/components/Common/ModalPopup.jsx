import React, { useState, useEffect }  from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { Typography, Button, IconButton } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@mui/icons-material/Error';
import AlertError from "../Common/AlertError";
import AlertSuccess from "../Common/AlertSuccess";

import { PlatformContext } from "../../store";
import * as ACTIONS from "../../actions/action";

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

const ModalPopup = ({ open, title, subTitle, onClose, message, data }) => {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(PlatformContext);
  const [errorAlert, setErrorAlert] = useState(null);
  const [successAlert, setSuccessAlert] = useState(null);

  const handleComplete = () => {
    console.log(data);
    let epoch = parseInt(Date.now() / 1000,10);
    ACTIONS.postNotifications("",{
      notificationId: data.notificationId,
      userName: data.userName,
      userGroup: data.userGroup,
      messageType: data.messageType,
      message: data.message,
      phone: data.phone,
      email: data.email,
      sendMail: data.sendMail,
      epochTime: data.epochTime,
      complete: 1,
      deadline: data.deadline,
      completeEpoch: epoch
    })(dispatch).then(msg => {
      console.log(msg.data.body);
      if(msg.data.body==="Success"){
        setSuccessAlert({ title: "Notification created successfully!" });
        ACTIONS.getNotificationDetails("",user,userGroup)(dispatch).then(msg => {});
      }
      else{
        setErrorAlert({ title: msg.data.body });
      }
    });
  }

  return (
    <>
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={open}
      onClose={onClose}
    >
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <br/>
      <Typography className={classes.dialogTitle}>{message}</Typography>
      <Button
        color="primary"
        onClick={handleComplete}
        className={classes.cancelButton}
      >
        Complete
      </Button>
      <Button
        color="secondary"
        onClick={onClose}
        className={classes.cancelButton}
      >
        Cancel
      </Button>
    </Dialog>
    <AlertError
      open={Boolean(errorAlert)}
      onClose={() => {setErrorAlert(null);onClose()} }
      message={ errorAlert !==null ? errorAlert.title : "" }
    />
    <AlertSuccess
      open={Boolean(successAlert)}
      onClose={() => {setSuccessAlert(null);onClose()} }
      message={ successAlert !==null ? successAlert.title : "" }
    />
    </>
  );
};

export default ModalPopup;
