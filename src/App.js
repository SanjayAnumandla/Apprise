import './App.css';

import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/Register/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Users from "./components/Dashboard/Users";
import Notification from "./components/Dashboard/Notification";
import Task from "./components/Dashboard/Task";
import NotificationCreation from "./components/Notification/NotificationCreation";
import NotificationReport from "./components/Notification/NotificationReport";
import TaskReport from "./components/Notification/TaskReport";
import TaskReportGraph from "./components/Notification/TaskReportGraph";
import AddAccount from "./components/UserSettings/AddAccount";
import ChangePassword from "./components/UserSettings/ChangePassword";
import UpdateAccount from "./components/UserSettings/UpdateAccount";
import Settings from "./components/UserSettings/Settings";


const App = () => {
  const Fragment = React.Fragment;
  useEffect(() => {
    document.title = "Apprise";
  }, []);

  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/notifications" component={Notification} />
          <Route exact path="/tasks" component={Task} />
          <Route exact path="/notificationCreation" component={NotificationCreation} />
          <Route exact path="/notificationReport" component={NotificationReport} />
          <Route exact path="/taskReport" component={TaskReport} />
          <Route exact path="/taskReportGraph" component={TaskReportGraph} />
          <Route exact path="/addAccount" component={AddAccount} />
          <Route exact path="/updateAccount" component={UpdateAccount} />
          <Route exact path="/changePassword" component={ChangePassword} />
          <Route exact path="/settings" component={Settings} />
          </Switch>
        </BrowserRouter>
      </Fragment>
    );
  };

export default App;
