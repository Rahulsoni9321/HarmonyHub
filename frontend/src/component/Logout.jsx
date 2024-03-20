import { SlLogout } from "react-icons/sl";
import { useAuthContext } from "../Context/Authuser";

export function Logout() {
  const { logout } = useAuthContext();

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
                  logout();
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
