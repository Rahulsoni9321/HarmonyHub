import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  AllUsersSidebaratom,
  DebounceAtom,
  FilterAtom,
  loadinguseratom,
} from "../atoms/Sidebar";
import { UserSkeleton } from "../Skeletons/UserSkeleton";
import { UserArea } from "./UserArea";
import { UserCard } from "./UserCard";
import { useUserDetailsContext } from "../Context/Userdetails";
import { BACKEND_URL } from "../config";

function useDebounce(inputuser) {
  const [debounce, setdebounce] = useRecoilState(DebounceAtom);
  setTimeout(() => {
    setdebounce(inputuser);
  }, 500);

  return debounce;
}

export function Usercontainer() {
  
  const {userloading,userdetails}=useUserDetailsContext();
  const [allusers, setallusers] = useRecoilState(AllUsersSidebaratom);
  const [filter, setfilter] = useRecoilState(FilterAtom);
  const debouncedvalue = useDebounce(filter);
  const [loading, setloading] = useRecoilState(loadinguseratom);

  useEffect(() => {
    async function fetchdata() {
 
    try  {
        setloading(true)
         const response = await axios.get(`${BACKEND_URL}/allusers?name=${debouncedvalue}`,{
       headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
       }
     })
        setloading(false)
        setallusers(response.data.user)
      }
      catch(error){
        console.log(error)

      }

      
      }
      fetchdata();
    }
  , [debouncedvalue]);

  

  return (
    <div className="h-screen w-full bg-blue-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-r border-gray-100  overflow-y-auto">
      <UserArea userdetails={userdetails} loading={userloading}></UserArea>

      <SearchUser
        setvalue={(e) => {
          setfilter(e.target.value);
        }}
      ></SearchUser>

      <div className="divider px-3"></div>
      <div className="w-full mt-4 flex flex-col items-center cursor-pointer ">
        {!loading ? (
          allusers && allusers.length > 0 ? (
            allusers.map((user) => {
              return user._id == userdetails._id ? null : (
                <UserCard user={user}></UserCard>
              );
            })
          ) : (
            "No User Found..."
          )
        ) : (
          <div className="flex justify-center items-center">
            <div className="w-11/12">
              <UserSkeleton />
              <UserSkeleton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SearchUser({ setvalue }) {
  return (
    <div className="pt-4 flex justify-center">
      <label className="input w-11/12 input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Start new chat..."
          onChange={setvalue}
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
  );
}

// onClick={() =>
//   document
//     .getElementById(`my_modal_${user._id}`)
//     .showModal()
// }

// <dialog
// id={`my_modal_${user._id}`}
// className="modal"
// >
// <div className="modal-box w-1/3  bg- rounded-full bg-clip-padding backdrop-filter backdrop-blur-xs bg-opacity-0 ">
//   <img
//     className="p-4 bg-contain"
//     src={user.profilepic}
//   />
// </div>
// <form method="dialog" className="modal-backdrop">
//   <button>close</button>
// </form>
// </dialog>
