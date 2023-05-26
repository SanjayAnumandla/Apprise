import { Auth } from "aws-amplify";
import dataService from "../services/service";


import {
  ADD_NOTIFICATION,
  USER_LIST,
  NOTIFICATION_LIST,
  DELETE_NOTIFICATION,
  EDIT_NOTIFICATION } from './ActionTypes';

export const addNotification = (notification) => {
  return {
    type: ADD_NOTIFICATION,
    payload: notification
  };
};

export const deleteNotification = (id) => {
  return {
    type: DELETE_NOTIFICATION,
    payload: id
  };
};

export const editNotification = (notification) => {
  return {
    type: EDIT_NOTIFICATION,
    payload: notification
  };
};

export const getUserDetails = (aSessionToken, aUserID) => {
  return dispatch => {
    return dataService
      .ServiceGetUser(aSessionToken, aUserID)
      .then(response => {
        dispatch({
          type: USER_LIST,
          data: response.data.body
        });
      })
      .catch(() => {
      });
  };
};

export const getNotificationDetails = (aSessionToken, aUserID, userGroup) => {
  return dispatch => {
    return dataService
      .ServiceGetNotifications(aSessionToken, aUserID, userGroup)
      .then(response => {
        dispatch({
          type: NOTIFICATION_LIST,
          data: response.data.body
        });
      })
      .catch(() => {
      });
  };
};



export const postUsers = (aSessionToken, dataPost) => {
  return () => {
    return dataService
      .ServicePostUsers(aSessionToken, dataPost)
      .then(response => {
        return response;
      });
  };
};

export const postNotifications = (aSessionToken, dataPost) => {
  return () => {
    return dataService
      .ServicePostNotifications(aSessionToken, dataPost)
      .then(response => {
        return response;
      });
  };
};
