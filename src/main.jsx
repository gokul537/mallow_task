import React from "react";
import ReactDOM from "react-dom/client"; // Note the import from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App"; // Import your Redux store
import "./index.css";
import store from "./store/store";

// Create the root and render the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
