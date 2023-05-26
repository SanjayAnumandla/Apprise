import React, { useEffect, useState }  from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { PlatformContext } from "../../store";
import SideBar from "../Common/SideBar";
import * as ACTIONS from "../../actions/action";

const useStyles = makeStyles((theme) => ({
  back: {
    background: 'linear-gradient(to right, #00172D, #00498D)',
    minHeight: '100vh'
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: '12%',
    background: 'linear-gradient(to right, #00172D, #00498D)'
  },
  header: {
    color: "white",
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    fontWeight: 600,
    marginBottom: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  button: {
    background: "linear-gradient(to right, #E45B40, #7A1F62)",
    color: "white",
    borderRadius: 25,
    fontWeight: 600,
    padding: theme.spacing(1.5, 4),
    margin: theme.spacing(2),
    transition: "0.3s",
    "&:hover": {
      background: "linear-gradient(to right, #7A1F62, #E45B40)",
    },
  },
}));

const Dashboard = props => {
  const classes = useStyles();
  const {history} = props;
  const { state, dispatch } = React.useContext(PlatformContext);
  const user = localStorage.getItem("username");
  const { UserState, NotifState } = state;
  const [userCount, setUserCount] = useState(0);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    ACTIONS.getUserDetails("",user)(dispatch).then(msg => {});
  }, []);


  useEffect(() => {
    let count = 0;
    let userList = [];
    if(UserState.userData !== undefined){
    localStorage.setItem("allData", JSON.stringify(UserState.userData));
    if(UserState.userData.OtherUser !== undefined){
      if(UserState.userData.OtherUser !== []){
        UserState.userData.OtherUser.forEach(data => {
          if(data.userName != data.userGroup){
          count+=1;
          userList.push(data)
        }
        })
        setUserCount(count);
        setUserData(userList);
      }
    }
  }
},[UserState.userData]);

  useEffect(() => {
    console.log(UserState.userData.isAdmin);
    if(UserState.userData !== undefined && UserState.userData.isAdmin !== undefined){
      let userGroup = UserState.userData.userGroup;
      console.log("userGroup",userGroup);
      localStorage.setItem("userGroup", userGroup);
      ACTIONS.getNotificationDetails("",user,userGroup)(dispatch).then(msg => {});
    }
  }, [UserState.userData.isAdmin]);

  const gotoLogin = () => {
    history.push({
            pathname: "/"
          });
        }

  const handleViewAllClick = (type) => {
    // This function handles the "View All" button click and navigates to a new page with the requested grid layout.
    history.push({
      pathname: "/details",
      state: { type }
    });
  };

    return (
    <div className={classes.back}>
      <SideBar
        gotoLogin={gotoLogin}
        pageName="Dashboard"
        showLogout
      />
      {(UserState.userData !== undefined && UserState.userData.isAdmin===1) ? (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <Paper className={classes.paper}>
              <Typography variant="h5">Users</Typography>
              <Typography variant="h3">{userCount}</Typography>
              <Button
                variant="contained"
                className={classes.button}
                onClick={() => history.push({ pathname: "/users", data: userData })}
              >
                View All
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Paper className={classes.paper}>
              <Typography variant="h5">Notifications</Typography>
              <Typography variant="h3">{NotifState.notifData.NotificationCount}</Typography>
              <Button
                variant="contained"
                className={classes.button}
                onClick={() => history.push({ pathname: "/notifications", data: NotifState.notifData.Notification })}
              >
                View All
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Paper className={classes.paper}>
              <Typography variant="h5">Tasks</Typography>
              <Typography variant="h3">{NotifState.notifData.TaskCount}</Typography>
              <Button
                variant="contained"
                className={classes.button}
                onClick={() => history.push({ pathname: "/tasks", data: NotifState.notifData.Task })}
              >
                View All
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    ) : (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <Paper className={classes.paper}>
              <Typography variant="h5">Notifications</Typography>
              <Typography variant="h3">{NotifState.notifData.NotificationCount}</Typography>
              <Button
                variant="contained"
                className={classes.button}
                onClick={() => history.push({ pathname: "/notifications", data: NotifState.notifData.Notification })}
              >
                View All
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Paper className={classes.paper}>
              <Typography variant="h5">Tasks</Typography>
              <Typography variant="h3">{NotifState.notifData.TaskCount}</Typography>
              <Button
                variant="contained"
                className={classes.button}
                onClick={() => history.push({ pathname: "/tasks", data: NotifState.notifData.Task })}
              >
                View All
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )}
    </div>
  );

};

export default Dashboard;
