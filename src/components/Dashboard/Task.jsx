import React,{ useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import SideBar from "../Common/SideBar";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, Modal } from '@material-ui/core';
import ModalPopup from "../Common/ModalPopup";
import { PlatformContext } from "../../store";
import * as ACTIONS from "../../actions/action";

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

const Task = props => {
  const user = localStorage.getItem("username");
  const userGroup = localStorage.getItem("userGroup");
  const { state, dispatch } = React.useContext(PlatformContext);
  const { NotifState, UserState } = state;
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(null);
  const [modalData, setModalData] = useState({});
  const [ data, setData ] = useState([]);

  useEffect(() => {
      ACTIONS.getNotificationDetails("",user,userGroup)(dispatch).then(msg => {});
  }, [modalData]);

  useEffect(() => {
    setData(NotifState.notifData.Task);
    console.log(NotifState.notifData.Task);
  }, [NotifState.notifData]);

console.log(NotifState.notifData.Task, data);

const messageStatusChange = messageData => {
  setOpenModal({ title: "Do you want to complete the task?" });
  setModalData(messageData);
}


  return (
    <div className={classes.root}>
      <SideBar
        pageName="Task"
      />
  {data !== undefined ? (
      <Grid container spacing={3}>
        {data.map((item, index) => (
          <Grid item xs={12} key={index} className={classes.grid}>
          {user === userGroup ? (
            item.complete === 0 ? (
              <Typography variant="h5" className={classes.message}>
                {item.message}{"  "}
                <CancelIcon className={classes.incomplete}/>
              </Typography>
            ) : (
              <Typography variant="h5" className={classes.message}>
                {item.message}{"  "}
                <CheckCircleIcon className={classes.complete}/>
              </Typography>
            )
          ) : (
            item.complete === 0 ? (
              <Typography variant="h5" className={classes.message} onClick={()=>messageStatusChange(item)}>
                {item.message}{"  "}
                <CancelIcon className={classes.incomplete}/>
              </Typography>
            ) : (
              <Typography variant="h5" className={classes.message}>
                {item.message}{"  "}
                <CheckCircleIcon className={classes.complete}/>
              </Typography>
            )
          )}


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
    ):("")}
      <ModalPopup
        open={Boolean(openModal)}
        onClose={() => {
          setOpenModal(null);
          setModalData({});
        } }
        message={ openModal !==null ? openModal.title : "" }
        data={modalData}
      />
    </div>
  );
};

export default Task;
