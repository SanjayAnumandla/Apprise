//import necessary dependencies
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  TextField,
  Button,
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

//define function component AddAccount
const AddAccount = () => {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(PlatformContext);
  const userGroup = localStorage.getItem("username");
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [errorAlert, setErrorAlert] = useState(null);
  const [successAlert, setSuccessAlert] = useState(null);

  //define handle functions for input fields and form submission
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleSubmit = (event) => {
  event.preventDefault();
  const errors = {};

  if (!username.trim()) {
    errors.username = 'Username is required';
  }
  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Invalid email address';
  }
  if (!phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\+\d{1,3}\d{10}$/.test(phone)) {
    errors.phone = 'Invalid phone number';
  }
  if (!password.trim()) {
    errors.password = 'Password is required';
  } else if (
    !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}/.test(password)
  ) {
    errors.password =
      'Password must have at least 8 characters, at least 1 uppercase letter, at least 1 lowercase letter, at least 1 number and at least 1 special character';
  }

  setErrors(errors);

  if (Object.keys(errors).length === 0) {
    // Handle form submission here
    ACTIONS.postUsers("",{
      userName: username,
      userGroup: userGroup,
      email: email,
      phone: phone,
      password: password,
      isAdmin: 0,
      AddUserType: 2
    })(dispatch).then(msg => {
      console.log(msg.data.body);
      if(msg.data.body==="Success"){
        setSuccessAlert({ title: "User Added successfully!" });
        handleReset();
      }
      else if(msg.data.body==="UsernameExists"){
        setErrorAlert({ title: "Error: User Addition failed. Username already exists." });
        handleReset();
      }
      else if(msg.data.body==="PhoneExists"){
        setErrorAlert({ title: "Error: User Addition failed. Phone number already exists." });
        handleReset();
      }
      else if(msg.data.body==="EmailExists"){
        setErrorAlert({ title: "Error: User Addition failed. Email already exists." });
        handleReset();
      }
      else{
        setErrorAlert({ title: "Error: User Addition failed. Please check your information and try again." });
        handleReset();
      }
    });
  }
};


//define a function for resetting the input fields and error alerts
  const handleReset = () => {
    setUsername('');
    setEmail('');
    setPhone('');
    setPassword('');
    setErrors({});
  };

//return JSX code with the necessary components and fields
  return (
  <div className={classes.back}>
    <SideBar pageName="Add User" />
    <div className={classes.root}>
      <Grid item xs={12} sm={8} md={6} lg={6}>
        <Paper className={classes.paper}>
          <form onSubmit={handleSubmit}>
            <h2>Add User</h2>
            <TextField
              className={classes.inputField}
              label="Username"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              className={classes.inputField}
              label="Email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              className={classes.inputField}
              label="Phone"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <TextField
              className={classes.inputField}
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <br />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              Save
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

export default AddAccount;
