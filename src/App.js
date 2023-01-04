// import logo from './logo.svg';
import "./App.css";
import React, { useState, useEffect } from "react";
import Home from "./Components/Home";
import Header from "./Components/Header";
import Chat from "./Components/Chat";
import { auth, provider } from "./FirebaseConfig";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [authh, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [userr] = useAuthState(auth);
  console.log("lllllll", userr);

  // sign in with google account
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      setAuth(true);
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
   
    });
  }, []);

  // for log-out
  const logOut = () => {
    signOut(auth);
  };



  return (
    <div className="">
      <Header user={user} logOut={logOut} userr={userr} authh={authh} />

      {userr ? (
        <Chat user={user} logOut={logOut} />
      ) : (
        <Home signInWithGoogle={signInWithGoogle} user={user} logOut={logOut} />
      )}
    </div>
  );
}

export default App;