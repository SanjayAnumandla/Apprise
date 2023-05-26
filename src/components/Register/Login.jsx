import React, { useState, useEffect } from 'react';
import { Auth } from "aws-amplify";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Typography, TextField, Button } from '@material-ui/core';
import AlertError from "../Common/AlertError";
import { ASSETS } from "../../assets/assets";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #00172D, #00498D)'
  },
  paper: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '300px',
    backgroundColor: '#f2f2f2',
    borderRadius: '15px',
    boxShadow: '0px 3px 20px rgba(0, 0, 0, 0.2)',
  },
  logo: {
    height: "150px",
    display: "block",
    margin: "auto"
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    background: "linear-gradient(to right, #E45B40, #7A1F62)",
    color: '#fff',
    '&:hover': {
      background: "linear-gradient(to right, #7A1F62, #E45B40)",
    }
  },
  register: {
    margin: theme.spacing(2, 0, 2),
    background: '#fff',
    color: '#7a1f3d',
    '&:hover': {
      background: '#eceffb',
    }
  },
  header: {
    color: '#02386E',
    marginBottom: '20px',
    fontWeight: 'bold',
    fontSize: '36px',
    textAlign: 'center',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)',
  },
  input: {
    '& label.Mui-focused': {
      color: '#3f51b5',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#3f51b5',
      },
      '&:hover fieldset': {
        borderColor: '#3f51b5',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3f51b5',
      },
    },
  },
}));


const Login = props => {
  const classes = useStyles();
  const { history } = props;

  // State variables for email, password, and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorAlert, setErrorAlert] = useState(null);

  // Call Amplify's Auth.currentUserInfo to get the current user information
  useEffect(() => {
    Auth.currentUserInfo()
      .then(info => setCurrentUserInfo(info))
      .catch(err => console.log(err));
  }, []);

    // Sign in the user with email and password using Amplify's Auth.signIn
  const signIn = async (event) => {
    event.preventDefault();

    try {
      const user = await Auth.signIn(email, password);
      console.log(user);
      // Store the user information in local storage
      localStorage.setItem("username", user.username);
      localStorage.setItem("email", user.attributes.email);
      localStorage.setItem("phone", user.attributes.phone_number);
      // Redirect to the dashboard page
      history.push('/dashboard');
    } catch (error) {
    // Handle authentication errors and set the error message
    let errorMessage = "An error occurred while signing in.";
    if (error.code === "UserNotFoundException") {
      errorMessage = "User does not exist.";
    } else if (error.code === "NotAuthorizedException") {
      errorMessage = "Incorrect username or password.";
    } else if (error.code === "UserNotConfirmedException") {
      errorMessage = "User has not confirmed account.";
    }
    setErrorAlert({ title: errorMessage });
  }
  };

  // Redirect to the register page
  const gotoRegister = () => {
    history.push('/register');
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <img src={ASSETS['LOGO']} alt="Apprise" className={classes.logo} />
        <Paper className={classes.paper} elevation={3}>
          <Typography component="h1" variant="h5" className={classes.header}>
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="email"
              autoComplete="email"
              autoFocus
              className={classes.input}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              className={classes.input}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={signIn}
            >
              Login
            </Button>
            <Button
              fullWidth
              variant="contained"
              className={classes.register}
              onClick={gotoRegister}
            >
              Create a new account
            </Button>
          </form>
        </Paper>
      </Container>
      <AlertError
        open={Boolean(errorAlert)}
        onClose={() => setErrorAlert(null) }
        message={ errorAlert !==null ? errorAlert.title : "" }
      />
    </div>
  );
};

export default Login;
