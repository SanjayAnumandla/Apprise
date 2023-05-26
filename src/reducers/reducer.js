// NotificationReducer.js

import {
  USER_LIST,
  NOTIFICATION_LIST,
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
  EDIT_NOTIFICATION
} from '../actions/action';

const initialState = {
  user: [],
  notifications: []
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LIST:
      return {
        ...state,
        user: [...state.user, action.payload]
      };
    case NOTIFICATION_LIST:
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    case DELETE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload)
      };
    case EDIT_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.map(notification => {
          if (notification.id === action.payload.id) {
            return {
              ...notification,
              ...action.payload
            };
          }
          return notification;
        })
      };
    default:
      return state;
  }
};

export default notificationReducer;
