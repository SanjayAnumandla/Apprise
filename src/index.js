import React from 'react';
import ReactDOM from 'react-dom';
import {Amplify} from "aws-amplify";
import './index.css';
import App from './App';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import reportWebVitals from './reportWebVitals';

import { ContextStoreProvider } from "./store";
import config from "./config";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3f51b5",
      dark: "#2c3ea3"
    },
    secondary: {
      main: "#ff7387"
    }
  }
});

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "notes",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      }
    ]
  }
});


ReactDOM.render(
  <ContextStoreProvider>
    <ThemeProvider theme={theme} >
      <App />
    </ThemeProvider>,
  </ContextStoreProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
