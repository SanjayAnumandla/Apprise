import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import SideBar from "../Common/SideBar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: '20%',
    background: 'linear-gradient(to right, #00172D, #00498D)',
    minHeight: '100vh'
  },
  grid: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    background: "white",
    borderRadius: 5,
    boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.3)",
  },
  paper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: theme.spacing(2),
    background: "white",
    borderRadius: 5,
  },
  message: {
    marginBottom: theme.spacing(2),
  },
  username: {
    textAlign: "left",
    fontWeight: 600,
  },
  date: {
    textAlign: "right",
  },
  complete: {
    color: "#63aa57"
  },
  incomplete: {
    color: "#b03535"
  }
}));

const Notification = props => {
  const { data } = props.location;
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <SideBar
        pageName="Notification"
      />
      <Grid container spacing={3}>
        {data.map((item, index) => (
          <Grid item xs={12} key={index} className={classes.grid}>
            <Typography variant="h5" className={classes.message}>
              {item.message}
            </Typography>
            <Paper className={classes.paper}>
              <Typography variant="subtitle2" className={classes.username}>
                {item.userName}
              </Typography>
              <Typography variant="subtitle2" className={classes.date}>
                {new Date(item.epochTime*1000).toLocaleString()}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Notification;
