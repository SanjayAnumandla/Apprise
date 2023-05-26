//import necessary dependencies
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  FormControlLabel,
  Button,
  MenuItem,
} from '@material-ui/core';
import SideBar from "../Common/SideBar";
import AlertError from "../Common/AlertError";
import AlertSuccess from "../Common/AlertSuccess";
import { PlatformContext } from "../../store";
import * as ACTIONS from "../../actions/action";

//define makeStyles function
const useStyles = makeStyles((theme) => ({
  back: {
    minHeight: '100vh'
  },
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: '15%'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formControl: {
    width: '100%',
    minWidth: 200,
  },
  inputField: {
    width: '100%',
    minWidth: 200,
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  resetButton: {
    marginTop: theme.spacing(2),
  },
}));

//define function component CreateNotificationPage
const CreateNotificationPage = () => {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(PlatformContext);
  const userGroup = localStorage.getItem("username");
  const [recipient, setRecipient] = useState([]);
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [sendMail, setSendMail] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorAlert, setErrorAlert] = useState(null);
  const [successAlert, setSuccessAlert] = useState(null);

  const [allData, setAllData] = useState([]);
  const [userList, setUserList] = useState({});

  useEffect(() => {
    setAllData(JSON.parse(localStorage.getItem("allData")));
  }, []);

    //define handle functions for input fields and form submission
  const handleRecipientChange = (event) => {
    setRecipient(event.target.value);
  };

  const handleMessageTypeChange = (event) => {
    setMessageType(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMailChange = (event) => {
    setSendMail(event.target.checked);
  };

  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    if (recipient.length === 0) {
      errors.recipient = 'Please select at least one recipient.';
    }
    if (messageType === '') {
      errors.messageType = 'Please select a message type.';
    }
    if (message === '') {
      errors.message = 'Please enter a message.';
    }
    if (messageType === 'task' && deadline === null) {
      errors.deadline = 'Please enter a deadline.';
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      // Handle form submission here

      console.log(recipient);
      recipient.map(recipientName => {
      Object.entries(userList).map(([key, val]) => {
        console.log(key,recipientName);
        if(key === recipientName)  {
        let epoch = parseInt(Date.now() / 1000,10);
        ACTIONS.postNotifications("",{
          notificationId: userGroup+"_"+recipientName+"_"+epoch,
          userName: recipientName,
          userGroup: userGroup,
          messageType: messageType,
          message: message,
          phone: val[1],
          email: val[0],
          sendMail: sendMail===false?0:1,
          epochTime: epoch,
          complete: 0,
          deadline: deadline
        })(dispatch).then(msg => {
          console.log(msg.data.body);
          if(msg.data.body==="Success"){
            setSuccessAlert({ title: "Notification created successfully!" });
            handleReset();
          }
          else{
            setErrorAlert({ title: msg.data.body });
          }
        });
        }
      })
      })
    }
  };

  const handleReset = () => {
    setRecipient([]);
    setMessageType('');
    setMessage('');
    setDeadline(null);
    setSendMail(false);
    setErrors({});
  };

  useEffect(() => {
    let user = {};
    if(allData !== undefined){
    if(allData.OtherUser !== undefined){
      if(allData.OtherUser !== []){
        allData.OtherUser.forEach(data => {
          console.log(data);
          if(data.userName != data.userGroup){
            user[data.userName]=[data.email, data.phone]
        }
        })
        setUserList(user);
      }
    }
  }
},[allData]);

//return JSX code with the necessary components and fields
  return (
    <div className={classes.back}>
    <SideBar
      pageName="Create Notification"
      />
    <div className={classes.root}>
      <Grid item xs={12} sm={8} md={6} lg={6}>
        <Paper className={classes.paper}>
          <form onSubmit={handleSubmit}>
            <h2>Create Notification</h2>
            <FormControl className={classes.formControl} error={!!errors.recipient}>
              <InputLabel id="recipient-label">Recipient</InputLabel>
              <Select
                labelId="recipient-label"
                id="recipient"
                multiple
                value={recipient}
                onChange={handleRecipientChange}
                renderValue={(selected) => selected.join(', ')}
              >
              {Object.keys(userList).map(keyVal =>
                (<MenuItem value={keyVal}>{keyVal}</MenuItem>)
              )}
              </Select>
            </FormControl>
            {errors.recipient && <p>{errors.recipient}</p>}
            <FormControl className={classes.formControl} error={!!errors.messageType}>
              <InputLabel id="messageType-label">Message Type</InputLabel>
              <Select
                labelId="messageType-label"
                id="messageType"
                value={messageType}
                onChange={handleMessageTypeChange}
              >
                <MenuItem value="">Select a message type</MenuItem>
                <MenuItem value="task">Task</MenuItem>
                <MenuItem value="notification">Notification</MenuItem>
              </Select>
            </FormControl>
            {errors.messageType && <p>{errors.messageType}</p>}
            {(messageType === "task")&&(
              <>
              <TextField
                className={classes.inputField}
                label="Deadline"
                id="deadline"
                type="number"
                value={deadline}
                onChange={handleDeadlineChange}
                error={!!errors.deadline}
                helperText={errors.deadline}
              />
              {errors.deadline && <p>{errors.deadline}</p>}
              </>
            )}
            <TextField
              className={classes.inputField}
              label="Message"
              id="message"
              value={message}
              onChange={handleMessageChange}
              error={!!errors.message}
              helperText={errors.message}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={sendMail}
                  onChange={handleSendMailChange}
                  name="sendMail"
                  color="primary"
                />
              }
              label="Send email notification"
            />
            <br/>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              Send
            </Button>
            <br/>
            <Button
              type="button"
              variant="outlined"
              color="primary"
              className={classes.resetButton}
              onClick={handleReset}
            >
              Reset
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
    <AlertError
      open={Boolean(errorAlert)}
      onClose={() => setErrorAlert(null) }
      message={ errorAlert !==null ? errorAlert.title : "" }
    />
    <AlertSuccess
      open={Boolean(successAlert)}
      onClose={() => setSuccessAlert(null) }
      message={ successAlert !==null ? successAlert.title : "" }
    />
    </div>
  );
};

export default CreateNotificationPage;
