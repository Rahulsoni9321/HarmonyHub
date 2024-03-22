import axios from "axios";
import { BACKEND_URL } from "../config";

import { createContext, useContext, useState, useEffect } from "react";

const UserContext=createContext();

export const  useUserDetailsContext=()=>{
    return useContext(UserContext)
}

export const UserContextProvider=({children})=>{
    const [userdetails,setuserdetails]=useState({});  
    const [userloading,setloading] = useState(false);
    
    useEffect(()=>{
        try { 
            async function Userdetails(){
                console.log("how much time usedetails")
            setloading(true)
            fetch(
                `${BACKEND_URL}/userprofile`,
                {
                  method: "GET",
                
                  headers: {
                    "Authorization":`Bearer ${localStorage.getItem('token')}`                  },
                }
              ).then(async function (res) {
                const json = await res.json();
                setuserdetails(json.user)
                setloading(false);
            })
        }
        Userdetails();
    }
    catch(error){
        console.error(error);
    }
    

    },[])

    return (
        <UserContext.Provider value={{userdetails,userloading}}>
           {children}
        </UserContext.Provider>
    )

}