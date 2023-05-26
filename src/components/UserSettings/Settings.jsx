import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Button,
  TextField,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: '#f2f2f2',
  },
  formControl: {
    margin: theme.spacing(1),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#4caf50',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#388e3c',
    },
  },
}));

const Settings = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Notification Types</FormLabel>
            <FormGroup className={classes.group}>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Email"
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Text Message"
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Push Notification"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Notification Frequency</FormLabel>
            <RadioGroup
              aria-label="notificationFrequency"
              name="notificationFrequency"
              className={classes.group}
            >
              <FormControlLabel
                value="daily"
                control={<Radio color="primary" />}
                label="Daily"
              />
              <FormControlLabel
                value="weekly"
                control={<Radio color="primary" />}
                label="Weekly"
              />
              <FormControlLabel
                value="monthly"
                control={<Radio color="primary" />}
                label="Monthly"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Notification Sound</FormLabel>
            <FormGroup className={classes.group}>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Default Sound"
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Custom Sound"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            variant="outlined"
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email Address"
            variant="outlined"
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" className={classes.button}>
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
