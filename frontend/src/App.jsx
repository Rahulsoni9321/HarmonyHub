import './App.css'
import {Route, Routes, Navigate, useNavigate} from "react-router-dom"
import { Signup } from './component/Signup'
import 'tailwindcss/tailwind.css';
import { Signin } from './component/Signin';
import { Dashboard } from './component/Dashboard';
import { Me } from './component/Me';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './Context/Authuser';

function App() {
   const {authuser}=useAuthContext();
  return (
    <>
    
    
     <Routes>
      <Route path='/Signup' element={authuser?<Navigate to={'/Dashboard'}/>:<Signup/>}/>
      <Route path='/' element={<Me/>}/>
      <Route path='/Signin' element={authuser?<Navigate to={'/Dashboard'}/>:<Signin/>}/>
      <Route path='/Dashboard' element={authuser?<Dashboard/>:<Navigate to={'/Signin'}/>}/>
     </Routes>
    
      <Toaster></Toaster>
    </>
  )
}

export default App
