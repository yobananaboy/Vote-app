import React from 'react';
import ReactDOM from 'react-dom';
import '../css/style.scss';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
//require("!style-loader!css-loader!./style.css");

// https://scotch.io/tutorials/routing-react-apps-the-complete-guide

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('application')
);