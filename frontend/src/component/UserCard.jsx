import { useSetRecoilState } from "recoil";
import { Chatclickedatom } from "../atoms/atoms";
import { useSocketContext } from "../Context/SocketContext";
import { Link } from "react-router-dom";


export function UserCard({ user }) {
  const setclick = useSetRecoilState(Chatclickedatom)
  const { onlineuser } = useSocketContext();
  return <Link to={`/Dashboard?id=${user._id}`} className="w-full flex  justify-center " >
    <div onClick={() => {
      setclick(true)
    }} className=" bg-blend w-11/12 h-16  bg-[#1d2226] bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-80 hover:bg-cyan-500 hover:rounded-xl mb-2 rounded-md border-none">
      <div className="flex gap-4 items-center h-full mx-4 ">
        <div
          className={
            onlineuser.includes(user._id)
              ? "avatar online placeholder"
              : "avatar offline placeholder"
          }
        >
          <div className="bg-neutral text-neutral-content rounded-full w-6 md:w-10">
            <span className="text-lg ">
              <img
                className="w-6 md:w-10"
                src={user.profilepic}
              />
            </span>
          </div>
        </div>
        <div className="text-white font-sans font-semibold text-none sm:text-lg">
          {user.firstname} {user.lastname}
        </div>
      </div>
    </div>
  </Link>
}