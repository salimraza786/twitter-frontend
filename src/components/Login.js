import React from "react";
import axios from "axios";
import { useState } from "react";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    //console.log(name,username,email,password);
    if (isLoggedIn) {
      // login
      try {
        setLoader(true)
        const res = await axios.post(
          `${USER_API_END_POINT}/login`,
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        dispatch(getUser(res?.data?.user));
        // console.log(res)
        if (res.data.success) {
          navigate("/");
          toast.success("LoggedIn Successfully " + res.data.message);
          setLoader(false)
        }
      } catch (error) {
        toast.error(
          "email or password are incorrect " + error.response.data.message
        );
        setLoader(false)
        console.log(error);
      }
    } else {
      // singup
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/register`,
          { name, username, email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(res);
        if (res.data.success) {
          setIsLoggedIn(true);
          toast.success("Signup successfully  " + res.data.message);
        }
      } catch (error) {
        toast.error("Username already exist " + error.response.data.message);
        console.log(error);
      }
    }
  };

  const loginSignupHandler = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-evenly w-[80%]">
        {/* left part */}
        <div>
          <img
            className="ml-4"
            width={"500px"}
            src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?w=740&t=st=1714184706~exp=1714185306~hmac=d2dc090b56a41a9444934d0db8cf5be68ab3a7051e8e20d332982c7bfa492b8f"
            alt=""
          />
        </div>
        <div>
          <div className="font-bold text-7xl my-12">
            <h1>Happening now</h1>
          </div>
          <h1 className="m-4 text-3xl font-bold">
            {isLoggedIn ? "Login" : "Signup"}
          </h1>
          <form
            onSubmit={submitHandler}
            className="flex  flex-col w-[70%] my-5"
          >
            {!isLoggedIn && (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className=" outline-blue-500 rounded-full px-4 py-2 my-2 border border-gray-800 hover:bg-slate-200"
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className=" outline-blue-500 rounded-full px-4 py-2 my-2 border border-gray-800  hover:bg-slate-200"
                />
              </>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" outline-blue-500 rounded-full px-4 py-2 my-2   border border-gray-800 hover:bg-slate-200"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className=" outline-blue-500 rounded-full px-4 py-2 my-2  border border-gray-800  hover:bg-slate-200"
            />
            {loader ? (
             <div className="text-center" role="status">
             <svg aria-hidden="true" class="w-8 h-8  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                 <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
             </svg>
             <span class="sr-only">Loading...</span>
         </div>
            ) : (
              <button className="px-5 py-2 my-4 border-none text-lg bg-[#1D9BF0] rounded-full  text-white ">
                {isLoggedIn ? "Login" : "Create Account"}
              </button>
            )}

            <h1>
              {isLoggedIn
                ? "Don't have an account? "
                : "Already have an account? "}
              <span
                className="text-red-700 font-bold cursor-pointer hover:text-green-600"
                onClick={loginSignupHandler}
              >
                {isLoggedIn ? "Registor" : "Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
