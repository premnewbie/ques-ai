import logopurple from "../assets/logopurple.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Login = ({ handleUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {  isLoading,login  } = useAuthStore();


  const handleLogin = async (e) => {
    e.preventDefault();
    login(email,password);
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-5">
      <img src={logopurple} alt="logo" className="w-15 h-15" />
      <div className="text-center">
        <h1 className="text-purple-800 text-2xl">Welcome To</h1>
        <h1 className="text-purple-800 text-2xl font-bold">Ques.AI</h1>
      </div>
      <form
        className="flex flex-col justify-center items-center w-full gap-5"
        onSubmit={handleLogin}
      >
        <input
          type="email"
          placeholder="Email Address"
          className="w-[70%] border border-gray-400 rounded h-10 p-3"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-[70%] border border-gray-400 rounded h-10 p-3"
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <div className="flex justify-between w-[70%]">
        <div className="flex gap-2">
          <input type="checkbox" />
          <p>Remember me</p>
        </div>
        <p className="text-blue-500 font-semibold">Forgot Password?</p>
      </div> */}
        <button type="submit" className="w-[70%] bg-purple-800 text-white h-10 font-semibold cursor-pointer">
          Login
        </button>
      </form>
      <div>
        Don't have an account?{" "}
        <span
          className="text-blue-500 underline cursor-pointer"
          onClick={() => handleUser(true)}
        >
          Sign Up
        </span>
      </div>
    </div>
  );
};

export default Login;
