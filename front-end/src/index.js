import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './Styles/main.scss';
// redux
// import { Provider } from 'react-redux';
// import { applyMiddleware, createStore } from 'redux';
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers";
// import { getPosts } from './actions/postActions';



ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);
