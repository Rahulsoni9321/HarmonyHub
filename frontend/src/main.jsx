import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import { AuthContextProvider } from "./Context/Authuser.jsx";
import {
  BrowserRouter
  
} from "react-router-dom";
import { SocketContextProvider } from "./Context/SocketContext.jsx";
import { UserContextProvider } from "./Context/Userdetails.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RecoilRoot>
      <AuthContextProvider>
        <UserContextProvider>
        <SocketContextProvider>
        <App />
        </SocketContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </RecoilRoot>
  </BrowserRouter>
);
