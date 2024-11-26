// import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Inputbox } from "../component/Inputbox";
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  EmailSigninatom,
  PasswordSinginatom,
  ResponseMessageSigninAtom,
  SiginProgressatom,
} from "../atoms/Signinatom";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/Authuser";
import { BACKEND_URL } from "../config";

export function Signin() {
  const message = useRecoilValue(ResponseMessageSigninAtom);
  return (
    <>
      <div className="w-full h-screen bg-[url(Al.jpg)]  bg-cover relative flex gap-6 flex-col justify-center items-center font-sans ">
      <div className="absolute w-full h-full bg-black/40 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"></div>

         <div className="z-20 text-3xl font-medium"> <span className="text-4xl">Harmony</span><span className="font-bold  text-[#674940] italic text-4xl">Hub</span></div>
        <div className=" flex w-full justify-center items-center   rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10   ">
          <div className="p-5 w-2/5  bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-100 ">
            <div className="text-center pt-6">
              <p className="text-xl sm:text-4xl tracking-wide text-white font-bold">Signin</p>
              <p className="text-md sm:text-[16px] font-regular leading-tight text-gray-300 pt-2">
                Enter your credentials to sign in
              </p>
            </div>
            <Email></Email>
            <Password />
            <div className="ml-6 text-red-500 text-sm font-regular  mt-2">
              {message}
            </div>
            <Button></Button>
            <Footer></Footer>
          </div>
        </div>
        {/* Main div ends here */}

        
      </div>
    </>
  );
}

function Email() {
  const setemail = useSetRecoilState(EmailSigninatom);

  return (
    <div className="mt-2">
      <p className="pt-2 pb-1 ml-5 font-semibold text-sm text-gray-200 ">
        Email
      </p>
      <Inputbox
        placeholder="Enter your email"
        type="text"
        setvalue={setemail}
      />
    </div>
  );
}
function Password() {
  const setpassword = useSetRecoilState(PasswordSinginatom);

  return (
    <div className="mt-2">
      <p className="pt-2 pb-1 ml-5 font-semibold text-sm text-gray-200 ">
        Password
      </p>
      <Inputbox
        placeholder="Enter your Password"
        type="password"
        setvalue={setpassword}
      />
    </div>
  );
}

function Button() {
  const email = useRecoilValue(EmailSigninatom);
  const password = useRecoilValue(PasswordSinginatom);
  const setmessage = useSetRecoilState(ResponseMessageSigninAtom);
  const [loading, setloading] = useRecoilState(SiginProgressatom);
  const {login} = useAuthContext();
  const navigate = useNavigate();


  const handleclick = async () => {
    try {
      setloading(true);
      const response = await axios.post(
        `${BACKEND_URL}/signin`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.data.message.includes("successfully")) {
        setmessage(response.data.message);
    
        setloading(false);

        toast.success("Signed up Successfully.");
        login(response.data.token)
        navigate("/Dashboard", { replace: true });
      }
      ;
    } catch (error) {
      setloading(false);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        setmessage(
          errorMessage ||
            "An error occurred while signing in. Please try again."
        );
      } else {
        setmessage("An error occurred while signing in. Please try again.");
      }
      setTimeout(() => {
        setmessage("");
      }, 2000);
    }
  };

  return (
    <div className=" my-2 mt-3 w-full text-center">
      <button
        className="w-11/12 p-2 py-2 text-sm text-white rounded-lg  text-center bg-[#161819] hover:bg-zinc-900"
        onClick={handleclick}
      >
        {loading ? (
          <div className="flex justify-center  items-center">
            <div
              class="animate-spin inline-block w-5 h-5 mr-4 border-[3px] border-current border-t-transparent text-white rounded-full "
              role="status"
              aria-label="loading"
            >
              <span class="sr-only">Loading...</span>
            </div>
            <p>Signing in...</p>
          </div>
        ) : (
          <p className="font-medium">Sign in</p>
        )}
      </button>
    </div>
  );
}

function Footer() {
  return (
    <div className="text-center my-3 ">
      <div className="text-white text-sm md:text-sm font-regular">
        Don't have an account?{" "}
        <Link
          className="bg-blend font-medium underline underline-offset-1 text-blue-500 "
          to={"/signup"}
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
