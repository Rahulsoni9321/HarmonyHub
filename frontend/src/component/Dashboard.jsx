import { useEffect, useState } from "react";
import {  useRecoilValue } from "recoil";
import { Chatclickedatom } from "../atoms/atoms";
import { Usercontainer } from "./Sidebar";
import { ChatArea } from "./ChatArea";
import { useSearchParams } from "react-router-dom";
import { Welcome } from "./Welcome";
import axios from "axios";
import { useAuthContext } from "../Context/Authuser";

export function Dashboard() {
  const clickedchat = useRecoilValue(Chatclickedatom);
  const {authuser}=useAuthContext();

  return (
    <div className={authuser.gender=="Male" ? "w-full h-screen text-center bg-white flex bg-[url(/boyimage.jpeg)] bg-contain bg-fixed":"w-full h-screen text-center bg-white flex bg-[url(/girlimage.jpg)] bg-contain bg-fixed"}>
      <div className="w-4/12  left-0 h-full  shadow-3xl">
        <Usercontainer></Usercontainer>
      </div>
      {clickedchat ? (
        <div className="w-full overflow-auto ">
          <Dashboardnav></Dashboardnav>
          <ChatArea></ChatArea>
        </div>
      ) : (
        <div className="w-full overflow-auto ">
          <Welcome></Welcome>{" "}
        </div>
      )}
    </div>
  );
}

function Dashboardnav() {
  const [searchparams] = useSearchParams();
  const userid = searchparams.get("id");
  const id = userid;
  const [userdata,setuserdata] = useState({});

useEffect(()=>{
   async function SelectedUser() {
  
      const response = await axios.get(
        `http://localhost:3000/api/v1/receiveruser?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setuserdata(response.data.receiveruser);
    }
    SelectedUser();
   
},[id])
  
  return (
    <div className="w-full overflow-auto">
      <div className="w-3/4 z-10 fixed top-0 h-16 flex items-center justify-between  bg-[#1d2226] rounded-none bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-80 border-b border-black ">
        <div className="flex justify-between ml-12 items-center">
          <div className="avatar online placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-8">
              <span className="text-lg">
                <img src={userdata.profilepic} />
              </span>
            </div>
          </div>
          <p className="ml-4 text-white font-sans font-semibold">
            {userdata.firstname} {userdata.lastname}
          </p>
        </div>
        </div>
        </div>
        
  );
}
