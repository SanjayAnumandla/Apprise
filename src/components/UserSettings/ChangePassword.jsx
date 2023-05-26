//import necessary dependencies
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Auth } from "aws-amplify";
import {
  Grid,
  Paper,
  Button,
  TextField,
 } from "@material-ui/core";
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


//define function component ChangePassword
const ChangePassword = () => {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(PlatformContext);
  const userName = localStorage.getItem("username");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [errorAlert, setErrorAlert] = useState(null);
  const [successAlert, setSuccessAlert] = useState(null);

    //define handle functions for input fields and form submission
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};

    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[0-9a-zA-Z!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;
    if (!formData.password.match(passwordRegex)) {
      validationErrors.password = "Password must contain at least 8 characters, at least 1 upper case letter, at least 1 lower case letter, at least 1 number, and at least 1 special character.";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      ACTIONS.postUsers("",{
        userName: userName,
        password: formData.password,
        AddUserType: 3
      })(dispatch).then(msg => {
        console.log(msg.data.body);
        if(msg.data.body==="Success"){
          setSuccessAlert({ title: "Password changed successfully!" });
          handleReset();
        }
        else{
          setErrorAlert({ title: "Error: Password change failed. Please try again." });
          handleReset();
        }
      });
    }
  };

  const handleReset = () => {
    setFormData({ password: "", confirmPassword: "" });
    setErrors({});
  };

  return (
  <div className={classes.back}>
    <SideBar pageName="Change Password" />
    <div className={classes.root}>
      <Grid item xs={12} sm={8} md={6} lg={6}>
        <Paper className={classes.paper}>
            <form onSubmit={handleSubmit}>
              <h2>Change Password</h2>
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
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

export default ChangePassword;
