import { createRoot } from "react-dom/client";

// Styles

import "./index.css";
import "./services/firebase/firebase";

// Components

import { App } from "./App";
import { Provider } from "react-redux";
import { store } from "./services/redux/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
