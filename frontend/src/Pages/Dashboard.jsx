import { useRecoilValue } from "recoil";
import { Chatclickedatom } from "../atoms/atoms";
import { Usercontainer } from "../component/Sidebar";
import { ChatArea } from "./ChatArea";
import {
  SelectedUserContextProvider,
} from "../Context/SelectedUser";
import { WelcomeUser } from "../component/Welcome";

import {
  UserContextProvider,
} from "../Context/Userdetails";
import { Dashboardnav } from "../component/Dashboardnav";
import { useSearchParams } from "react-router-dom";

export function Dashboard() {
  const [searchparams] = useSearchParams();
  const SelectedUserId = searchparams.get("id");

  return (
    <UserContextProvider>

      <SelectedUserContextProvider>
        <div
          className={
            "w-full h-screen text-center bg-white flex bg-[url(/girlimage.jpg)] bg-cover bg-center bg-fixed"
          }
        >
          <div className="w-4/12  left-0 h-full  shadow-3xl">
            <Usercontainer></Usercontainer>
          </div>
          {SelectedUserId ? (
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

    </UserContextProvider>
  );
}

