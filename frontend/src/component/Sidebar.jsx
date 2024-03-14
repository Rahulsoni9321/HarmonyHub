import axios from "axios";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Chatclickedatom } from "../atoms/atoms";
import { useNavigate } from "react-router-dom";
import { SlLogout } from "react-icons/sl";
import {
  AllUsersSidebaratom,
  DebounceAtom,
  FilterAtom,
  loadinguseratom,
} from "../atoms/Sidebar";
import toast from "react-hot-toast";
import { UserSkeleton } from "../Skeletons/UserSkeleton";
import { useAuthContext } from "../Context/Authuser";
import { useSocketContext } from "../Context/SocketContext";

function useDebounce(inputuser) {
  const [debounce, setdebounce] = useRecoilState(DebounceAtom);
  setTimeout(() => {
    setdebounce(inputuser);
  }, 500);

  return debounce;
}

export function Usercontainer() {
  const [allusers, setallusers] = useRecoilState(AllUsersSidebaratom);
  const setchatclicked = useSetRecoilState(Chatclickedatom);
  const [filter, setfilter] = useRecoilState(FilterAtom);
  const debouncedvalue = useDebounce(filter);
  const [loading,setloading]=useRecoilState(loadinguseratom)
  const {authuser}=useAuthContext();
  const {onlineuser}=useSocketContext();
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchdata() {
      setloading(false)
     try { const response = await axios.get(
        `http://localhost:3000/api/v1/allusers?name=${debouncedvalue}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
        setloading(true)
     
      setallusers(response.data.user);
    }
    catch(error){
      console.log(error)
    }
  }
    fetchdata();
  }, [debouncedvalue]);

 

  return (
    <div className="h-screen w-full bg-blue-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-r border-gray-100  overflow-y-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 my-2 mt-4 ml-2">
          <div className="w-12 h-12 flex items-center rounded-full bg-blend border border-red-100">
            <div className="px-2 rounded-full ">
              <img
                className="w-9 h-8 cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
                onClick={() =>
                  document.getElementById(`my_modal_${authuser._id}`).showModal()
                }
                src={authuser.profilepic}
              />
                <dialog id={`my_modal_${authuser._id}`}  className="modal">
                            <div className="modal-box w-1/3  bg- rounded-full bg-clip-padding backdrop-filter backdrop-blur-xs bg-opacity-0 ">
                              <img className="p-4 bg-contain" src={authuser.profilepic}/>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                              <button>close</button>
                            </form>
                          </dialog>
            </div>
          </div>
          <div className="text-white ">
            {authuser.firstname} {authuser.lastname}{" "}
          </div>
        </div>
        <Logout></Logout>
      </div>
      <div className="pt-4 flex justify-center">
        <label className="input w-11/12 input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Start new chat..."
            onChange={(e) => {
              setfilter(e.target.value);
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="divider px-3"></div>
      <div className="w-full mt-4 flex flex-col items-center cursor-pointer ">
        { loading ? 
        allusers && allusers.length > 0
          ? allusers.map((user) => {
              return user._id == authuser._id ? null : (
                <div
                  className=" bg-blend w-11/12 h-16  bg-[#1d2226] bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-80 hover:bg-cyan-500 hover:rounded-xl mb-2 rounded-md border-none"
                  onClick={() => {
                    setchatclicked(true);
                    navigate(`/Dashboard?id=${user._id}`);
                  }}
                >
                  <div className="flex gap-4 items-center h-full mx-4 ">
                    <div className={onlineuser.includes(user._id) ? "avatar online placeholder":"avatar offline placeholder"}>
                      <div className="bg-neutral text-neutral-content rounded-full w-6 md:w-10">
                        <span className="text-lg ">
                          <img
                            className="w-6 md:w-10"
                            onClick={() =>
                              document.getElementById(`my_modal_${user._id}`).showModal()
                            }
                            src={user.profilepic}
                          />
                          <dialog id={`my_modal_${user._id}`}  className="modal">
                            <div className="modal-box w-1/3  bg- rounded-full bg-clip-padding backdrop-filter backdrop-blur-xs bg-opacity-0 ">
                              <img className="p-4 bg-contain" src={user.profilepic}/>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                              <button>close</button>
                            </form>
                          </dialog>
                        </span>
                      </div>
                    </div>
                    <div className="text-white font-sans font-semibold text-none sm:text-lg">
                      {user.firstname} {user.lastname}
                    </div>
                  </div>
                </div>
              );
            })
          : "No User Found...":<div className="flex justify-center items-center">
            <div className="w-11/12"> 

            <UserSkeleton/>
            <UserSkeleton/>
           
            </div>
            </div>}
      </div>
    </div>
  );
}

function Logout() {
  const navigate = useNavigate();
  const {setauthuser}=useAuthContext();

  return (
    <div>
      <span onClick={() => document.getElementById("my_modal_1").showModal()}>
        <SlLogout className="w-24 text-white h-5 cursor-pointer" />
      </span>

      <dialog
        id="my_modal_1"
        className="modal   bg-gray-700 rounded-none bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-25"
      >
        <div className="modal-box w-1/4  bg-[#1d2226] rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-80 shadow-3xl ">
          <h3 className="font-bold text-md md:text-lg">
            Are you sure you want to Logout?
          </h3>
          <br></br>
          <br></br>
          <div className="modal-action">
            <form method="dialog" className="w-full">
              <button
                className="btn btn-primary w-5/12 mr-2 hover:rounded-none rounded-full outline-none"
                onClick={() => {
                  setauthuser(null);
                  localStorage.removeItem("token");
                  toast.success("Logged out successfully.")
                  navigate("/Signin", { replace: true });
                }}
              >
                Yes
              </button>
              <button className="btn w-5/12 ml-2 hover:rounded-none rounded-full outline-none">
                No
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
