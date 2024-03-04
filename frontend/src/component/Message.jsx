import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { GiNothingToSay } from "react-icons/gi";
import { SkeletonMessages } from "./MessageSkeletons";
import { extractTime } from "./ExtractTime";
import { useAuthContext } from "../Context/Authuser";
import { useSocketContext } from "../Context/SocketContext";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Mainmessageatom } from "../atoms/Conversationatom";

export function Message() {
  const [usermessages, setusermessages] = useRecoilState(Mainmessageatom); //usereactloadables
  const [receiver, setreceiver] = useState({});
  const [loading, setloading] = useState(false);
  const {socketid}=useSocketContext();
  const { authuser } = useAuthContext();
  const [searchparams] = useSearchParams();
  const id = searchparams.get("id");
  const lastmessageref = useRef();

 
 


  useEffect(() => {
    setTimeout(() => {
      if (lastmessageref) {

        lastmessageref.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [usermessages]);

  useEffect(() => {
    async function Conversation() {
      setloading(false);
      const response = await axios.get(
        `http://localhost:3000/api/v1/send/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setloading(true);

      setusermessages(response.data.allmessages);
    }
    Conversation();
    async function SelectedUser() {
      const response = await axios.get(
        `http://localhost:3000/api/v1/receiveruser?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setreceiver(response.data.receiveruser);
    }
    SelectedUser();

    return () => {
      setusermessages([]);
      setreceiver({});
    };
  }, [id]);

  useEffect(()=>{
    socketid.on('newmessage',(newmessages)=>{
      setusermessages((newmessages)=>[...usermessages,newmessages])
    })
},[])

  return (
    <>
      {loading ? (
        usermessages && usermessages.length > 0 ? (
          usermessages.map((message) => (
            <div
              key={message.id}
              className={
                message.receiverId === id
                  ? "chat chat-end my-4"
                  : "chat chat-start my-4"
              }
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={
                      message.receiverId == id
                        ? authuser.profilepic
                        : receiver.profilepic
                    }
                  />
                </div>
              </div>
              <div
                ref={lastmessageref}
                className={
                  message.receiverId == id
                    ? "bg-gray-900 bg-opacity-80 chat-bubble text-gray-200 text-left"
                    : "bg-gray-500 bg-opacity-80 chat-bubble text-gray-200 text-left"
                }
              >
                {message.messages}
              </div>
              <div className="chat-footer text-xs text-white opacity-80 flex gap-1 items-center">
                {extractTime(message.createdAt)}
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center gap-3">
            <p className="text-xl text-gray-200">
              Send a Message to Start a Conversation..{" "}
            </p>{" "}
            <GiNothingToSay className="text-gray-300 w-8 h-8 " />
          </div>
        )
      ) : (
        <div>
          <SkeletonMessages></SkeletonMessages>
          <SkeletonMessages></SkeletonMessages>
          <SkeletonMessages></SkeletonMessages>
          <SkeletonMessages></SkeletonMessages>
          <SkeletonMessages></SkeletonMessages>
        </div>
      )}
    </>
  );
}
