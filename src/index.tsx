import * as React from "react";
import { render } from "react-dom";

import App from "./App";

import rootReducer from './slices'
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const store = configureStore({ reducer: rootReducer })

const rootElement = document.getElementById("root");
render(<Provider store={store}>
    <App />
  </Provider>, rootElement);
