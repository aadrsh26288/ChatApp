import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

const Home = ({ signInWithGoogle, user, logOut }) => {
  return (
    <div className="flex h-screen  gap-4 flex-col items-center justify-center ">
      <p className="xsm:text-xl  text-white sm:text-2xl  lg:text-3xl font-semibold text-center">
        Sign In With Google to Continue
      </p>
      <button
        className="text-xl text-gray-200 border rounded-lg p-2 px-8 flex items-center gap-2"
        onClick={signInWithGoogle}
      >
        <FcGoogle className="text-2xl" /> Sign in with Google
      </button>
    </div>
  );
};

export default Home;