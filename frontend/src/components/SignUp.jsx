import { useState } from "react";
import logopurple from "../assets/logopurple.png";
import { useAuthStore } from "../store/authStore.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = ({ handleUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const { signup, isLoading } = useAuthStore();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords must match");
        return;
      }
      await signup(username, email, password);
      setEmail('');
      setUsername('');
      navigate("/");
    } catch (error) {
      console.log("Error in handleSignup:", error.message);
    }
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
        onSubmit={handleSignup}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          className="w-[70%] border border-gray-400 rounded h-10 p-3"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          className="w-[70%] border border-gray-400 rounded h-10 p-3"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-[70%] border border-gray-400 rounded h-10 p-3"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-[70%] border border-gray-400 rounded h-10 p-3"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-[70%] bg-purple-800 text-white h-10 font-semibold cursor-pointer"
        >
          Sign Up
        </button>
      </form>
      <div>
        Already have an account?{" "}
        <span
          className="text-blue-500 underline cursor-pointer"
          onClick={() => handleUser(false)}
        >
          Log In
        </span>
      </div>
    </div>
  );
};

export default SignUp;
