import { Socket, io } from "socket.io-client";

import { createContext, useState, useEffect, useContext, useRef } from "react";
import { useAuthContext } from "./Authuser";

const Socketcontext = createContext();

export const useSocketContext = () => {
  return useContext(Socketcontext);
};

export const SocketContextProvider = ({ children }) => {
  const [socketid, setsocketid] = useState(null);
  const [onlineuser, setonlineuser] = useState([]);
  const { authuser } = useAuthContext();
  

  useEffect(() => {
    if (localStorage.getItem("token") && authuser) {
     
        const socket = io("http://localhost:3000", {
          query: {
            userid: authuser._id,
          },
        });
      
      socket.on("onlineusers",(onlineusers)=>{
        setonlineuser(onlineusers);
    })
      setsocketid(socket.id);

      return () => {
        socket.close();
      };
    } else {
      setsocketid(null);
    }
  }, [authuser]);

  return (
    <Socketcontext.Provider value={{ socketid, onlineuser }}>
      {children}
    </Socketcontext.Provider>
  );
};
