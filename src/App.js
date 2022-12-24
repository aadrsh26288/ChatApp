// import logo from './logo.svg';
import './App.css';
import React, { useState ,useEffect} from 'react'
import Home from './Components/Home';
import Chat from './Components/Chat';
import { auth,provider } from './FirebaseConfig'; 
import { signInWithPopup,onAuthStateChanged,signOut } from "firebase/auth";
import {BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";



function App() {
    const [authh,setAuth] = useState(false)
    const [user, setUser] = useState({})
    // const [currentUser,setCurrentUser] = useState(user.displayName)
    const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      setAuth(true)
    });    
  };

    useEffect(()=>{
    onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser)
      // console.log('auth',currentUser.photoURL)
      
    })
  },[])

  
const logOut=()=>{
  signOut(auth)
}

// console.log('logOut',user)


  return (
    <div className="">
  <BrowserRouter>
     <Routes>{
      }
    <Route  exact path="/" element={<Home signInWithGoogle={signInWithGoogle} user={user} logOut={logOut}/>} />
    <Route path="/chat" element={<Chat user={user}/>} />
   </Routes>
  </BrowserRouter>


    </div>
  );
}

export default App;
