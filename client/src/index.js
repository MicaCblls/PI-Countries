import React from "react";
import ReactDOM from "react-dom";
import "./global.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/store";
import axios from "axios";
/* import reportWebVitals from './reportWebVitals'; */

const { REACT_APP_API } = process.env;

axios.defaults.baseURL = REACT_APP_API || "http://localhost:3000";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
/* reportWebVitals(); */
