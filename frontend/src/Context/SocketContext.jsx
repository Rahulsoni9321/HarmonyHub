import { io } from "socket.io-client";

import { createContext, useState, useEffect, useContext, useRef } from "react";
import { useUserDetailsContext } from "./Userdetails";
import { useAuthContext } from "./Authuser";

const Socketcontext = createContext();

export const useSocketContext = () => {
  return useContext(Socketcontext);
};

export const SocketContextProvider = ({ children }) => {
  const [socketid, setsocketid] = useState(null);
  const [socket,setsocket] = useState(null);
  const [onlineuser, setonlineuser] = useState([]);
  const { userdetails } = useUserDetailsContext();
  const { authenticated } = useAuthContext();

  useEffect(() => {
    if (authenticated && userdetails) {
  
      const socket =  io("http://localhost:5000", {
        query: {
          userid: userdetails._id,
        },
      });
      setsocket(socket);
      socket.on("onlineusers", (onlineusers) => {
        setonlineuser(onlineusers);
      });
      setsocketid(socket.id);
      return () => {
        socket.close();
      }
    }
  }, [authenticated, userdetails]);
  return (
    <Socketcontext.Provider value={{ socketid, onlineuser,socket }}>
      {children}
    </Socketcontext.Provider>
  );
};
