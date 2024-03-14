import './App.css'
import {Route, Routes} from "react-router-dom"
import { Signup } from './component/Signup'
import 'tailwindcss/tailwind.css';
import { Signin } from './component/Signin';
import { Dashboard } from './Pages/Dashboard';
import { Me } from './component/Me';
import { Toaster } from 'react-hot-toast';
import { Welcome } from './Pages/Welcome';

function App() {
  return (
    <>
    
    
     <Routes>
      <Route path='/Signup' element={<Signup/>}/>
      <Route path='/' element={<Me/>}/>
      <Route path='/Welcome' element={<Welcome/>}/>
      <Route path='/Signin' element={<Signin/>}/>
      <Route path='/Dashboard' element={<Dashboard/>}/>
     </Routes>
    
      <Toaster></Toaster>
    </>
  )
}

export default App
