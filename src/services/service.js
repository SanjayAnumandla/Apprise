import axios from "axios";
import config from "../config";


const dataService = {

  ServiceGetUser: (idToken, aUserID) => {
    return axios({
      method: "get",
      url: `${config.API.GET_ALL_USERS}${aUserID}`,
      headers: { Authorization: `Bearer ${idToken}` }
    });
  },

    ServiceGetNotifications: (idToken, aUserID, userGroup) => {
      return axios({
        method: "get",
        url: `${config.API.GET_ALL_NOTIFICATIONS}${aUserID}?userGroup=${userGroup}&userName=${aUserID}`,
        headers: { Authorization: `Bearer ${idToken}` }
      });
    },

  ServicePostUsers: (idToken, dataPost) => {
    return axios({
      method: "post",
      url: `${config.API.POST_ALL_USERS}`,
      headers: { Authorization: `Bearer ${idToken}` },
      data: dataPost
    });
  },

  ServicePostNotifications: (idToken, dataPost) => {
    return axios({
      method: "post",
      url: `${config.API.POST_ALL_NOTIFICATIONS}`,
      headers: { Authorization: `Bearer ${idToken}` },
      data: dataPost
    });
  }

  };


  export default dataService;
