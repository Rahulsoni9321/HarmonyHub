import { Inputbox } from "../component/Inputbox";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  Signinlastnameatom,
  SignupFirstnameatom,
  SignupProgressatom,
  Signupemailatom,
  Signupgenderatom,
  Signupmessageatom,
  Singuppasswordatom,
} from "../atoms/Signupatom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/Authuser";
import { BACKEND_URL } from "../config";
import { BsStars } from "react-icons/bs";

export function Signup() {



  return (
    <div className="bg-[bg.png]  w-full h-screen overflow-y-auto ">
      <div className="grid grid-cols-4 md:grid-cols-9 w-full h-full  ">
        <div className="col-span-0 md:col-span-3 sm:w-full h-screen bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 overflow-auto">
        </div>

        <div className="col-span-4 md:col-span-3 flex items-center sm:w-full h-screen bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 overflow-auto ">
          <div className="w-11/12  bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100">
            <Header></Header>
            <div>
              <Username></Username>
              <FirstName></FirstName>
              <LastName></LastName>
              <Gender></Gender>
              <Password></Password>
              <Submit></Submit>
            </div>
            <Footer></Footer>
          </div>
        </div>

        <div className="col-span-0 md:col-span-3 sm:w-full h-screen  bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 overflow-auto ">
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="text-center p-3 pt-4 leading-tight ">
      <div className="text-xl flex items-center justify-center gap-1 text-white md:text-3xl font-semibold"><div>
        Harmony<span className="italic text-[#7e594d] font-bold">Hub</span>   </div>             <BsStars className="text-yellow-400 w-12 h-10"></BsStars>{" "}
      </div>
      <p className="font-normal text-sm md:text-base text-gray-300 pt-1 ">
        {" "}
        Enter your information to create your account
      </p>
    </div>
  );
}

function Username() {
  const setemail = useSetRecoilState(Signupemailatom);

  return (
    <div>
      <p className=" pb-1 ml-5 font-semibold text-sm text-white">Username</p>
      <Inputbox
        placeholder="Enter your email"
        type="text"
        setvalue={setemail}
      />
    </div>
  );
}

function FirstName() {
  const setfirstname = useSetRecoilState(SignupFirstnameatom);

  return (
    <div>
      <p className="pt-2 pb-1 ml-5 font-semibold text-sm text-white">
        Firstname
      </p>
      <Inputbox
        placeholder="Enter your firstname"
        type="text"
        setvalue={setfirstname}
      />
    </div>
  );
}
function LastName() {
  const setlastname = useSetRecoilState(Signinlastnameatom);

  return (
    <div>
      <p className="pt-2 pb-1 ml-5 font-semibold text-sm text-white ">
        Lastname
      </p>
      <Inputbox
        placeholder="Enter your lastname"
        type="text"
        setvalue={setlastname}
      />
    </div>
  );
}

function Gender() {
  const setgender = useSetRecoilState(Signupgenderatom);

  return (
    <div className="flex  w-3/5 items-center pt-2 justify-between">
      <p className=" ml-5 font-semibold text-sm text-white ">Gender</p>
      <input
        className=" p-1 pl-3 text-sm font-thin text-white"
        type="radio"
        value={'Male'}
        onChange={(e) => {
          setgender(e.target.value);
        }}
      ></input>
      <span className="text-sm text-white font-semibold">Male</span>
      <input
        className=" p-1 pl-3 text-sm font-thin text-white"
        type="radio"
        value={'Female'}
        onChange={(e) => {

          setgender(e.target.value);
        }}
      ></input>
      <span className="text-sm text-white font-semibold">Female</span>
    </div>
  );
}

function Password() {
  const setpassword = useSetRecoilState(Singuppasswordatom);

  return (
    <div>
      <p className="pt-1 pb-1 ml-5 font-semibold text-sm text-white ">
        Password
      </p>
      <Inputbox
        placeholder="Enter your password"
        type="password"
        setvalue={setpassword}
      />
    </div>
  );
}
function Submit() {
  const [message, setmessage] = useRecoilState(Signupmessageatom);
  const [loading, setloading] = useRecoilState(SignupProgressatom)
  const email = useRecoilValue(Signupemailatom);
  const firstname = useRecoilValue(SignupFirstnameatom);
  const lastname = useRecoilValue(Signinlastnameatom);
  const password = useRecoilValue(Singuppasswordatom);
  const gender = useRecoilValue(Signupgenderatom);
  const { login } = useAuthContext();
  const navigate = useNavigate();



  const handleclick = async () => {
    try {
      setloading(true)
      const response = await axios.post(
        `${BACKEND_URL}/signup`,

        {
          email,
          firstname,
          lastname,
          gender,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setmessage(response.data.message);
      if (response.data.message.includes("successfully")) {
        setloading(false)
        toast.success("Signed up Successfully.")
        login(response.data.token)
        navigate("/Dashboard", { replace: true });
      }
    } catch (error) {
      setloading(false)
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        setmessage(
          errorMessage ||
          "An error occurred while signing up. Please try again."
        );
      } else {
        setmessage("An error occurred while signing up. Please try again.");
      }
      setTimeout(() => {
        setmessage("");
      }, 2000);
    }
  };
  return (
    <>
      <div className="ml-6 text-red-500 text-sm font-regular my-1">
        {message}
      </div>
      <div className=" my-2 w-full text-center">
        <button
          className="w-11/12 p-1 py-2 mt-2 text-sm text-white rounded-lg bg-[#161819] text-center hover:bg-gray-800"
          onClick={handleclick}
        >
          {loading ? (<div className="flex justify-center  items-center">
            <div
              class="animate-spin inline-block w-5 h-5 mr-4 border-[3px] border-current border-t-transparent text-white rounded-full "
              role="status"
              aria-label="loading"
            >
              <span class="sr-only">Loading...</span>
            </div>
            <p>Signing up...</p>
          </div>) : ("Sign up")}
        </button>
      </div>
    </>
  );
}

function Footer() {
  return (
    <div className="text-center my-5 ">
      <div className="text-white text-sm md:text-sm font-medium">
        Already have an account?{" "}
        <Link
          className="bg-blend underline underline-offset-1 text-gray-400 hover:text-gray-900"
          to={'/signin'}
        >
          Signin
        </Link>
      </div>
    </div>
  );
}
