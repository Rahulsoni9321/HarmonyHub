import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import { SocketContextProvider } from "./Context/SocketContext.jsx";
import { AuthContextProvider } from "./Context/Authuser.jsx";
import {BrowserRouter,Router,Route, Routes, Navigate, useNavigate} from "react-router-dom"
import { SelectedUserContextProvider } from "./Context/SelectedUser.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <RecoilRoot>

      <AuthContextProvider>
    <SocketContextProvider> 
        <App />
    </SocketContextProvider>
      </AuthContextProvider>
  </RecoilRoot>
  </BrowserRouter>
);
