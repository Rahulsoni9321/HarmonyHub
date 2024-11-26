import { useRecoilState } from "recoil";
import { TbSend } from "react-icons/tb";
import axios from "axios";
import { Loadingsendatom, Sendermessageatom } from "../atoms/SendMessageatom";
import { useSelectedUsercontext } from "../Context/SelectedUser";
import { useAllMessages } from "../hook/AllMessages";
import { useEffect, useRef } from "react";
import { GiNothingToSay } from "react-icons/gi";
import { useSocketContext } from "../Context/SocketContext";
import { SkeletonMessages } from "../Skeletons/MessageSkeletons";
import { extractTime } from "../component/ExtractTime";
import { useUserDetailsContext } from "../Context/Userdetails";
import { BACKEND_URL } from "../config";

export function ChatArea() {
  const { setAllMessages, AllMessages, loading } = useAllMessages();
  const { SelectedUserId, SelectedUser } = useSelectedUsercontext();
  const { socketid } = useSocketContext();
  const {userdetails,userloading} = useUserDetailsContext();
  const lastmessageref = useRef();
  const [messages, setMessages] = useRecoilState(Sendermessageatom);
  const [sentloading, setsentloading] = useRecoilState(Loadingsendatom);

  useEffect(() => {
    setTimeout(() => {
      if (lastmessageref) {
        lastmessageref.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [AllMessages]);

  useEffect(() => {
    socketid.on("newmessages", (msg) => {
      console.log(msg);
      setAllMessages([...AllMessages, ...msg]);
    });
  }, []);

  if (loading) {
    return (
      <div>
        <SkeletonMessages></SkeletonMessages>
        <SkeletonMessages></SkeletonMessages>
        <SkeletonMessages></SkeletonMessages>
        <SkeletonMessages></SkeletonMessages>
        <SkeletonMessages></SkeletonMessages>
      </div>
    );
  }

  const sendMessageevent = async () => {
    setsentloading(false);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/send/${SelectedUserId}`,
        {
          messages: messages,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const sentmessage = res.data.newmessage;
      setAllMessages([...AllMessages, ...sentmessage]);
      setsentloading(true);
      setMessages("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="h-screen overflow-auto pt-20 pb-10  px-4  bg-blue-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-none  ">
          {AllMessages && AllMessages.length > 0 ? (
            AllMessages.map((message) => (
              <div
                key={message.id}
                className={
                  message.receiverId === SelectedUserId
                    ? "chat chat-end my-4"
                    : "chat chat-start my-4"
                }
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={
                        message.receiverId == SelectedUserId
                          ? userdetails.profilepic
                          : SelectedUser.profilepic
                      }
                    />
                  </div>
                </div>
                <div
                  ref={lastmessageref}
                  className={
                    message.receiverId == SelectedUserId
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
          )}
        </div>
      </div>

      <div className="fixed bottom-0 w-full flex h-12 items-center outline-none">
        {" "}
        <label className="input w-3/4 input-bordered rounded-none outline-none border-t border-black flex items-center gap-2">
          <input
            type="text"
            className="grow outline-none text-gray-200 "
            placeholder="Start new chat..."
            value={messages}
            onChange={(e) => {
              setMessages(e.target.value);
            }}
          />
          {sentloading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-10 h-6 opacity-70 cursor-pointer "
              onClick={sendMessageevent}
            >
              <TbSend />
            </svg>
          ) : (
            <div className="loading loading-spinner w-6 h-6"></div>
          )}
        </label>
      </div>
    </>
  );
}
