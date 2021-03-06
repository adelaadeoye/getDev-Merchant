import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { reducer as signUpReducer } from "./redux/reducers/SignUpReducer";
import { reducer as signInReducer } from "./redux/reducers/SignInReducer";
import { reducer as addProductReducer } from "./redux/reducers/AddProductReducer";

const store = createStore(combineReducers({signUpReducer,signInReducer,addProductReducer}), applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
