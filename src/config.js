/* eslint no-useless-escape: "off" */

module.exports = {
  s3: {
    REGION: "YOUR_S3_UPLOADS_BUCKET_REGION",
    BUCKET: "YOUR_S3_UPLOADS_BUCKET_NAME"
  },
  apiGateway: {
    REGION: "YOUR_API_GATEWAY_REGION",
    URL: "YOUR_API_GATEWAY_URL"
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_gc7OeMoJw",
    APP_CLIENT_ID: "4skugahorg2d5k7qsq9f7gtoak",
    IDENTITY_POOL_ID: "us-west-2:6224f335-e367-4039-9f5c-013240657898"
  },
  API: {
    GET_ALL_USERS: `https://t6ef8zm2ii.execute-api.us-west-2.amazonaws.com/prod/v1_apprise_userdetails_getdata/`,
    POST_ALL_USERS: `https://t6ef8zm2ii.execute-api.us-west-2.amazonaws.com/prod/v1_apprise_userdetails_post`,
    GET_ALL_NOTIFICATIONS: `https://t6ef8zm2ii.execute-api.us-west-2.amazonaws.com/prod/v1_apprise_notificationdetails_getdata/`,
    POST_ALL_NOTIFICATIONS: `https://t6ef8zm2ii.execute-api.us-west-2.amazonaws.com/prod/v1_apprise_notificationdetails_post`,
  },

  CONSTANTS: {},
};
