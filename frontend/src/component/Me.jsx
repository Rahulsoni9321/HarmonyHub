import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../Context/Authuser";

export function Me() {
    const navigate=useNavigate();
    const {authuser,setauthuser}=useAuthContext();

    useEffect(()=>{
        if (localStorage.getItem('token')){

            navigate('/signup')
        }
        else{
            setauthuser(null);
            navigate('/Welcome')
        }    
    },[])



    
    return <>
    </>
}