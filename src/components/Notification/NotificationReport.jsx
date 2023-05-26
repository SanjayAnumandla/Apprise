import React,{ useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import SideBar from "../Common/SideBar";
import { PlatformContext } from "../../store";
import * as ACTIONS from "../../actions/action";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  container: {
    maxWidth: 800,
    margin: 'auto',
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  },
  responsiveTable: {
    overflowX: 'auto',
  },
}));

const NotificationReport = () => {
  const classes = useStyles();
  const user = localStorage.getItem("username");
  const { state, dispatch } = React.useContext(PlatformContext);
  const { NotifState, UserState } = state;
  const [ notifications, setNotifications ] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    ACTIONS.getNotificationDetails("",user,user)(dispatch).then(msg => {});
  }, []);

  useEffect(() => {
    if(NotifState.notifData !== undefined) {
    setNotifications(NotifState.notifData.Notification);
    console.log(NotifState.notifData.Notification);
  }
  }, [NotifState.notifData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
  <div className={classes.container}>
    <SideBar pageName="Notification Report" />
    <h1>Notification Report</h1>
    <TableContainer component={Paper} className={classes.responsiveTable}>
      <Table className={classes.table} aria-label="notification table">
        <TableHead>
          <TableRow>
            <TableCell>Epoch Time</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Complete</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Send Mail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notifications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((notification) => (
            <TableRow key={notification.notificationId}>
              <TableCell>{new Date(notification.epochTime*1000).toLocaleString()}</TableCell>
              <TableCell>{notification.userName}</TableCell>
              <TableCell>{notification.message}</TableCell>
              <TableCell>{notification.complete === 0 ? "No" : "Yes"}</TableCell>
              <TableCell>{notification.email}</TableCell>
              <TableCell>{notification.phone}</TableCell>
              <TableCell>{notification.sendMail === 0 ? "No" : "Yes"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={notifications.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  </div>
);
}

export default NotificationReport;
