import './App.css'
import {Navigate, Route, Routes} from "react-router-dom"
import 'tailwindcss/tailwind.css';
import { Signin } from './Pages/Signin';
import { Dashboard } from './Pages/Dashboard';
import { Me } from './component/Me';
import { Toaster } from 'react-hot-toast';
import { Welcome } from './Pages/Welcome';
import { Signup } from './Pages/Signup';
import { useAuthContext } from './Context/Authuser';

function App() {
  const {authenticated}=useAuthContext();
  return (
    <>
    
    
     <Routes>
      <Route path='/Signup' element={authenticated?<Navigate to={'/Dashboard'}></Navigate>:<Signup/>}/>
      <Route path='/' element={<Welcome/>}/>
      <Route path='/Signin' element={authenticated?<Navigate to={'/Dashboard'}></Navigate>:<Signin/>}/>
      <Route path='/Dashboard' element={authenticated?<Dashboard/>:<Navigate to={'/'}></Navigate>}/>
     </Routes>
    
      <Toaster></Toaster>
    </>
  )
}

export default App
