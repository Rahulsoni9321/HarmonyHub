import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import { AuthContextProvider } from "./Context/Authuser.jsx";
import {
  BrowserRouter
  
} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RecoilRoot>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </RecoilRoot>
  </BrowserRouter>
);
