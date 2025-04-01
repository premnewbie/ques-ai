import { useState } from "react";
import logowhite from "../assets/logowhite.png";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const Welcome = () => {
  const [newUser, setNewUser] = useState(false);

  const handleUser = (val) => {
    setNewUser(val);
  };

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 bg-gradient-to-r from-purple-600 to-purple-500 min-h-screen text-white">
        <div className="p-20">
          <div className="flex gap-2">
            <img src={logowhite} alt="logo" className="w-10 h-10" />
            <h3 className="font-bold text-2xl">Ques.AI</h3>
          </div>
          <div className="w-[50%] mt-8">
            <h1 className="text-5xl">
              Your podcast will no longer be just a hobby.
            </h1>
          </div>
          <div className="w-[40%] mt-8">
            <h5 className="text-xl">
              Supercharge Your Distribution using our AI assistant!
            </h5>
          </div>
        </div>
      </div>
      {newUser && (
        <div>
          <SignUp handleUser={handleUser} />
        </div>
      )}
      {!newUser && (
        <div>
          <Login handleUser={handleUser} />
        </div>
      )}
    </div>
  );
};

export default Welcome;
