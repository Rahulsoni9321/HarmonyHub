import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const navigate=useNavigate();
const [authenticated,setauthenticated] = useState(!!localStorage.getItem('token'));   

  const login= (token)=>{
    localStorage.setItem('token',token)
    setauthenticated(true)
  }
  

  const logout=()=>{
    localStorage.removeItem('token');
    setauthenticated(false);
    toast.success("Logged out successfully.");
    
    navigate('/');

  }

  return (
    <AuthContext.Provider value={{ logout,login, authenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
