import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext=createContext();

export const useAuthContext=()=>{
    return useContext(AuthContext);
} 


export const AuthContextProvider=({children})=>{
  const [authloading,setloading]=useState(false)
    const [authuser,setauthuser]=useState(null)
    console.log(authuser)
    useEffect(() => {
     
     
      
        setloading(true)
         async function Userprofile() {
          try
          {
          const response = await axios.get(
            `http://localhost:3000/api/v1/user/userprofile`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setauthuser(response.data.user);
          setloading(false)
         
        }
        catch(error){
          console.log("error while fetching the information.", error)
        }
      }
      
    Userprofile();
      }, []);


    return <AuthContext.Provider value={{authuser,setauthuser,authloading}}>
        {children}
    </AuthContext.Provider>
}