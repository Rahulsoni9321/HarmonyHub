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
            const response = await axios.get(`${BACKEND_URL}/userprofile`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            setuserdetails(response.data.user)
        }
        Userdetails();
        setloading(false);
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