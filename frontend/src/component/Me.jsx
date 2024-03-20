import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
// import { useAuthContext } from "../Context/Authuser";

export function Me() {
    const navigate=useNavigate();

    useEffect(()=>{
        if (localStorage.getItem('token')){

            navigate('/Dashboard')
        }
        else{
            // setauthuser(null);
            navigate('/Welcome')
        }    
    },[])



    
    return <>
    </>
}