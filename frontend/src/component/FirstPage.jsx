import { useNavigate } from "react-router-dom";
import { BsStars } from "react-icons/bs";

export function FirstPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen  overflow-y-auto">
        <div className="w-11/12 sm:w-2/4  text-center  rounded-lg  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 shadow-lg">
          <div className="my-4 px-6">
            <div>
              <p className="text-3xl text-white font-sans font-semibold py-3 flex justify-center items-center">
                {" "}
                Welcome to HarmonyHub{" "}
                <BsStars className="text-yellow-400 w-20 h-12"></BsStars>{" "}
              </p>
              <p className="text-lg text-white opacity-50 py-5">
                {" "}
                Let's Chat and Form Bond
              </p>
            </div>
            <center>
              {" "}
              <div className="flex w-10/12 justify-between px-6">
                <div className=" py-4 w-52">
                  <p className="py-6">New Here?</p>
                  <button
                    className="btn btn-primary w-2/4 text-gray-200 mr-2 hover:rounded-none rounded-full outline-none"
                    onClick={() => {
                      navigate("/Signup");
                    }}
                  >
                    Signup
                  </button>
                </div>

                <div className=" py-4 ">
                  <div className="py-6"> Already have an Account?</div>
                  <button
                    className="btn btn-primary w-2/4 text-gray-200 mr-2 hover:rounded-none rounded-full outline-none"
                    onClick={() => {
                      navigate("/Signin");
                    }}
                  >
                    Signin
                  </button>
                </div>
              </div>
            </center>
          </div>
        </div>
      </div>
    </>
  );
}
