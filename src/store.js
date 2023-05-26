// configureStore.js
import React from "react";
import { createStore } from 'redux';

import {
  USER_LIST,
  NOTIFICATION_LIST,
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  EDIT_NOTIFICATION
} from './actions/ActionTypes';

export const PlatformContext = React.createContext();

const INITIAL_STATE = {
  UserState: {
    userData: []
  },
    NotifState: {
      notifData: []
    },
  DashboardState: {
    dashboardConfig: []
  }
};

const REDUCER = (state, action) => {
  const pageValues = [];
  switch (action.type) {
      case USER_LIST:
        state = {
          ...state,
          UserState: {
            ...state.UserState,
            userData: action.data
          }
        };
        return state;
      case NOTIFICATION_LIST:
        state = {
          ...state,
          NotifState: {
            ...state.NotifState,
            notifData: action.data
          }
        };
        return state;
      case DASHBOARD_BLOCK_CONFIGURATIONS_RECIEVED:
        state = {
          ...state,
          DashboardState: {
            ...state.DashboardState,
            dashboardConfig: action.data
          }
        };
        return state;
      default:
      return state;
  }
};

export const ContextStoreProvider = props => {
  const [state, dispatch] = React.useReducer(REDUCER, INITIAL_STATE);
  const { Provider } = PlatformContext;
  const { children } = props;

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
