import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  AppBar,
  Grid,
  Paper,
  Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TableChartIcon from '@mui/icons-material/TableChart';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { ASSETS } from "../../assets/assets";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  logo: {
    height: "150px",
    display: "block",
    margin: "auto"
  },
  image: {
    background: "linear-gradient(to right, #7A1F62, #E45B40)",
    padding: "0px 30px 30px 30px",
    color: "#fff",
    fontWeight: 800,
    borderBottomStyle: 'ridge'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    fontWeight: 500,
    backgroundColor: '#7a1f3d'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#fff"
  },
  drawerContainer: {
    overflow: 'auto',
  },
  logoutButton: {
    marginLeft: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logo: {
    height: "150px",
    display: "block",
    margin: "auto"
  },
  personalDesc: {
    paddingTop: '20px',
    paddingLeft: '20px',
    width: "100%"
  }
}));

const SideBar = props => {
  const {gotoLogin, pageName, showLogout} = props;
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const user = localStorage.getItem("username");
  const userGroup = localStorage.getItem("userGroup");
  const email = localStorage.getItem("email");
  const phone = localStorage.getItem("phone");

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    gotoLogin();
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {pageName}
          </Typography>
        {showLogout && (
          <IconButton
            aria-label="logout"
            color="inherit"
            edge="end"
            onClick={handleLogout}
            className={classes.logoutButton}
          >
            <ExitToAppIcon />
          </IconButton>
        )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
      <div className={classes.drawerContainer}>
        <div className={classes.image}>
        <img src={ASSETS['LOGO']} alt="Apprise" className={classes.logo} />
          <Typography variant="subtitle2">{user}</Typography>
          <Typography variant="subtitle2">{email}</Typography>
          <Typography variant="subtitle2">{phone}</Typography>
        </div>
          <List>
            <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem button key='Dashboard'>
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary='Dashboard' />
              </ListItem>
            </Link>
            {(user === userGroup) &&(
            <Link to="/notificationCreation" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button key='CreateNotification'>
              <ListItemIcon><EditNotificationsIcon /></ListItemIcon>
              <ListItemText primary='Create Notification' />
            </ListItem>
          </Link>
          )}
          {(user === userGroup) &&(
          <Link to="/notificationReport" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button key='NotificationReport'>
            <ListItemIcon><TableChartIcon /></ListItemIcon>
            <ListItemText primary='Notification Report' />
          </ListItem>
        </Link>
        )}
          {(user === userGroup) &&(
          <Link to="/taskReport" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button key='TaskReport'>
            <ListItemIcon><TableChartIcon /></ListItemIcon>
            <ListItemText primary='Task Report' />
          </ListItem>
        </Link>
        )}
          {(user === userGroup) &&(
          <Link to="/taskReportGraph" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button key='TaskReportGraph'>
            <ListItemIcon><AnalyticsIcon /></ListItemIcon>
            <ListItemText primary='Task Report Graph' />
          </ListItem>
        </Link>
        )}
          {(user === userGroup)&&(
            <Link to="/addAccount" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button key='AddUser'>
              <ListItemIcon><PersonAddAltIcon /></ListItemIcon>
              <ListItemText primary='Add User' />
            </ListItem>
          </Link>
        )}
            <Link to="/changePassword" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button key='ChangePassword'>
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary='Change Password' />
            </ListItem>
          </Link>
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default SideBar;
