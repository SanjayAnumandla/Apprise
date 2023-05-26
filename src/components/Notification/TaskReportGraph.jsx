import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SideBar from "../Common/SideBar";
import { PlatformContext } from "../../store";
import * as ACTIONS from "../../actions/action";
import Chart from 'chart.js/auto';

Chart.register({
  id: 'category',
  afterBuildTicks: function(chart) {
    chart.ticks = chart.data.labels;
    return;
  }
});

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 800,
    margin: 'auto',
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  chartContainer: {
    padding: '1rem',
    marginTop: '2rem',
    border: '1px solid #ccc',
    borderRadius: '10px',
  },
}));

const TaskReport = () => {
  const classes = useStyles();
  const user = localStorage.getItem("username");
  const { state, dispatch } = React.useContext(PlatformContext);
  const { NotifState, UserState } = state;
  const [ notifications, setNotifications ] = useState([]);
  const [ data, setData ] = useState({});
  const [ options, setOptions ] = useState({});

  useEffect(() => {
    ACTIONS.getNotificationDetails("",user,user)(dispatch).then(msg => {});
  }, []);

  useEffect(() => {
    if(NotifState.notifData !== undefined) {
      setNotifications(NotifState.notifData.Task);
    }
  }, [NotifState.notifData]);

  useEffect(() => {
    if (notifications.length > 0) {
      const dataObj = {};
      let userList = [];
      let completeEpochList = [];
      let estimateEpochList = [];

      notifications.forEach((notif) => {
        if(notif.complete === 1){
          const user = notif.userName;
          const epoch = notif.epochTime;
          const completeEpoch = notif.completeEpoch;
          const estimateEpoch = epoch + (notif.deadline * 3600);

          userList.push(user);
          completeEpochList.push({"x": user, "y":completeEpoch});
          estimateEpochList.push({"x": user, "y":estimateEpoch});
        }
      });

      const data1 = {
        labels: userList,
        datasets: [
          {
            label: "Estimate Time",
            data: estimateEpochList,
            borderColor: "red",
            backgroundColor: "transparent",
          },
          {
            label: "Complete Time",
            data: completeEpochList,
            borderColor: "blue",
            backgroundColor: "transparent",
          },
        ],
      };

      const options1 = {
        scales: {
          y: {
            ticks: {
              callback: function(value) {
                const date = new Date(value * 1000);
                const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                return formattedDate;
              }
            }
          }
        }
      };

      setData(data1);
      setOptions(options1)
    }
  }, [notifications]);

  return (
    <div className={classes.container}>
      <SideBar pageName="Task Report Graph" />
      <h1 className={classes.title}>Task Report Graph</h1>
      <Paper className={classes.chartContainer}>
        {data.labels && <Line data={data} options={options} />}
      </Paper>
    </div>
  );
};

export default TaskReport;
