import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import { store } from "./store";
import { Provider } from "react-redux";

import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./styles";

import Routes from "./routes";
import { loginAction } from "./store/actions/loginActions";
import {currentUserAction, getCurrentUser} from "./store/actions/userActions";

if (localStorage.getItem("token")) {
  store.dispatch(loginAction({ token: localStorage.getItem("token")}));
  if (localStorage.getItem("user")) {
    store.dispatch(currentUserAction({user: localStorage.getItem("user")}))
  }
  store.dispatch(getCurrentUser());
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
