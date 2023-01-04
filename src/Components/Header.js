import React from "react";
import { auth } from "../FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import chatlogo from "../img/messenger.png";
import { BiChat } from "react-icons/bi";
import {HiOutlineLogout} from "react-icons/hi"
const Header = ({ user, logOut, userr, authh }) => {
  const [currentUser] = useAuthState(auth);
  console.log("logged in guy", userr);
  return (
    <div className="bg-[#1d1c1f] text-white p-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <BiChat className="text-3xl" />
        <p className="text-xl font-semibold -mt-1 hidden md:inline">Chatty</p>
      </div>
      <div className="flex items-center gap-3 md:gap-5 lg:gap-8">
        <div className="">
          {currentUser ? (
            <div className="flex gap-2 items-center">
              {" "}
              <img
                src={user?.photoURL}
                alt="user"
                className="md:h-10 md:w-10 h-6 w-6 rounded-full"
              />
              <p>{user?.displayName}</p>{" "}
            </div>
          ) : (
            ""
          )}
        </div>
        {
          currentUser?    <button className="p-2 px-3 flex items-center gap-1" onClick={logOut}>
          <HiOutlineLogout className="text-xl mt-1"/>
         <span> Logout</span>
          
        </button>:''
        }
    
      </div>
    </div>
  );
};

export default Header;