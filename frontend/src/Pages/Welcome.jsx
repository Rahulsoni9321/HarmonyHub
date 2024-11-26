import { useEffect } from "react";
import { FirstPage } from "../component/FirstPage";
import { useAuthContext } from "../Context/Authuser";
import { useNavigate } from "react-router-dom";

export function Welcome() {
   const {authenticated} = useAuthContext();
     const navigate = useNavigate();

   useEffect(()=>{
      if (authenticated) {
        navigate("/Dashboard")
      }
   },[authenticated])
    return <>
    <FirstPage></FirstPage>
    </>
}