import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext=createContext();

export const useAuthContext=()=>{
    return useContext(AuthContext);
} 


export const AuthContextProvider=({children})=>{
    let [authuser,setauthuser]=useState({})
    useEffect(() => {
        async function Userprofile() {
          const response = await axios.get(
            `http://localhost:3000/api/v1/userprofile`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setauthuser(response.data.user);
          
         
        }
        Userprofile();
      }, []);

    return <AuthContext.Provider value={{authuser,setauthuser}}>
        {children}
    </AuthContext.Provider>
}