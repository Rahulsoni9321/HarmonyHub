import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";


const SelectedUserContext=createContext();


export const useSelectedUsercontext=()=>{
   return  useContext(SelectedUserContext)
}

export const SelectedUserContextProvider=({children})=>{
    const [searchparams]=useSearchParams();
    const SelectedUserId=searchparams.get('id');
    const [SelectedUser,setSelectedUser]=useState({})
    const [loading,setloading]=useState(false);
  
    
useEffect(()=>{
   if (localStorage.getItem('token')){
    async function SelectedUser() {
       setloading(true)
       const response = await axios.get(
         `http://localhost:3000/api/v1/user/receiveruser?id=${SelectedUserId}`,
         {
           headers: {
             Authorization: `Bearer ${localStorage.getItem("token")}`,
           },
         }
       );
       setloading(false);
       setSelectedUser(response.data.receiveruser);
     }
     SelectedUser();
    }
    
    
 },[SelectedUserId])

  return <SelectedUserContext.Provider value={{SelectedUserId,SelectedUser,loading}}>
    {children}
  </SelectedUserContext.Provider>
}