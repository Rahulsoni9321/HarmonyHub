import { GiNothingToSay } from "react-icons/gi";
import { PiHandWaving } from "react-icons/pi";
import { BsStars } from "react-icons/bs";
import { useAuthContext } from "../Context/Authuser";

export function User() {
     const {authuser}=useAuthContext();
    return <div className="flex items-center justify-center h-screen  rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-r border-gray-100 ">
        <div className="text-white text-xl md:text-3xl font-semibold font-sans mr-2">
       <div className="flex items-center">
       Hello  <span className="underline-offset-1 text-rose-600 drop-shadow-lg ml-1">{authuser.firstname}</span> <PiHandWaving className="text-yellow-500 ml-2" />,
        </div>
        <div className="flex items-center">Welcome to HarmonyHub <BsStars className="text-yellow-400" /></div>
        <div className="flex items-center">
        Select a User to Start Messaging
         <GiNothingToSay className="text-gray-300 w-10 h-8 " />
        
        </div>
        </div>
    </div>
}