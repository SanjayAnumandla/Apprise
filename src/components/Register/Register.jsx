// Import necessary dependencies from Material UI and other components
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Typography, TextField, Button } from '@material-ui/core';
import AlertError from "../Common/AlertError";
import AlertSuccess from "../Common/AlertSuccess";

// Import necessary dependencies for assets, store and actions
import { ASSETS } from "../../assets/assets";
import { PlatformContext } from "../../store";
import * as ACTIONS from "../../actions/action";

// Define the styles for this component using Material UI's makeStyles
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #00172D, #00498D)'
  },
  logo: {
    height: "150px",
    display: "block",
    margin: "auto"
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
  login: {
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


// Define the Register component
const Register = props => {
  const classes = useStyles();
  const { state, dispatch } = React.useContext(PlatformContext);
  const { history } = props;

  // Set initial state of error and success alerts to null using useState hook
  const [errorAlert, setErrorAlert] = useState(null);
  const [successAlert, setSuccessAlert] = useState(null);

  // Set initial state of the form fields and their errors using useState hook
  const [formState, setFormState] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
  });

  // Define a function to validate the form
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate username
    if (!formState.username) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    // Validate phone
    if (!formState.phone) {
      newErrors.phone = 'Phone is required';
      valid = false;
    } else if (!/^\+\d{1,3}\d{10}$/.test(formState.phone)) {
      newErrors.phone = 'Phone number is invalid';
      valid = false;
    }

    // Validate email
    if (!formState.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Email address is invalid';
      valid = false;
    }

    // Validate password
    if (!formState.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/.test(formState.password)
    ) {
      newErrors.password =
        'Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character and be at least 8 characters long';
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  // Define a function to handle changes in the form fields
  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  // Define a function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      // submit the form data
      // Use the postUsers action to submit the form data to the backend
      ACTIONS.postUsers("",{
        userName: formState.username,
        userGroup: formState.username,
        email: formState.email,
        phone: formState.phone,
        password: formState.password,
        isAdmin: 1,
        AddUserType: 1
      })(dispatch).then(msg => {
        console.log(msg.data.body);
        if(msg.data.body==="Success"){
          setSuccessAlert({ title: "Registered successfully!" });
        }
        else if(msg.data.body==="UsernameExists"){
          setErrorAlert({ title: "Error: Registration failed. Username already exists." });
        }
        else if(msg.data.body==="PhoneExists"){
          setErrorAlert({ title: "Error: Registration failed. Phone number already exists." });
        }
        else if(msg.data.body==="EmailExists"){
          setErrorAlert({ title: "Error: Registration failed. Email already exists." });
        }
        else{
          setErrorAlert({ title: "Error: Registration failed. Please check your information and try again." });
        }
      });

    }
  };

  const gotoLogin = () => {
    history.push({
      pathname: '/',
    });
  };

// Render the Register component
  return (
      <div className={classes.root}>
        <Container component="main" maxWidth="xs">
          <img src={ASSETS['LOGO']} alt="Apprise" className={classes.logo} />
          <Paper className={classes.paper} elevation={3}>
            <Typography component="h1" variant="h5" className={classes.header}>
              Register
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formState.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
                value={formState.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formState.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
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
                value={formState.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>

              <Button
                fullWidth
                variant="contained"
                className={classes.login}
                onClick={gotoLogin}
                >
                Already a user? Login
                </Button>
            </form>
          </Paper>
        </Container>
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

  export default Register;
