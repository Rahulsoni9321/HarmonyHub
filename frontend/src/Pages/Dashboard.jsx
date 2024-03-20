import { useRecoilValue } from "recoil";
import { Chatclickedatom } from "../atoms/atoms";
import { Usercontainer } from "../component/Sidebar";
import { ChatArea } from "./ChatArea";
import {
  SelectedUserContextProvider,
  useSelectedUsercontext,
} from "../Context/SelectedUser";
import { WelcomeUser } from "../component/Welcome";
import { SocketContextProvider } from "../Context/SocketContext";
import {
  UserContextProvider,
} from "../Context/Userdetails";

export function Dashboard() {
  const clickedchat = useRecoilValue(Chatclickedatom);

  return (
    <UserContextProvider>
      <SocketContextProvider>
        <SelectedUserContextProvider>
          <div
            className={
              "w-full h-screen text-center bg-white flex bg-[url(/girlimage.jpg)] bg-cover bg-center bg-fixed"
            }
          >
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
                <WelcomeUser />{" "}
              </div>
            )}
          </div>
        </SelectedUserContextProvider>
      </SocketContextProvider>
    </UserContextProvider>
  );
}

function Dashboardnav() {
  const { loading, SelectedUser } = useSelectedUsercontext();
  console.log("hii from dashboard nav")
  return (
    <div className="w-full overflow-auto">
      <div className="w-3/4 z-10 fixed top-0 h-16 flex items-center justify-between  bg-[#1d2226] rounded-none bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-80 border-b border-black ">
        <div className="flex justify-between ml-12 items-center">
          {loading ? (
            <div className="loading loading-spinner w-6 h-6"></div>
          ) : (
            <>
              <div className="avatar online placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-8">
                  <span className="text-lg">
                    <img src={SelectedUser.profilepic} />
                  </span>
                </div>
              </div>
              <p className="ml-4 text-white font-sans font-semibold">
                {SelectedUser.firstname} {SelectedUser.lastname}
              </p>{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
