import React, { useState ,useEffect} from 'react'

// import { auth,provider } from '../FirebaseConfig'; 
// import { signInWithPopup,onAuthStateChanged,signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword,signInWithEmailAndPassword,} from 'firebase/auth';



 

const Home = ({signInWithGoogle,user,logOut}) => {
  // const navigate = useNavigate();
  // const [Imgurl,setImgurl]=useState('')
  // const [user, setUser] = useState({})


//   // if(auth){
//   // navigate('/chat')
//   //   }



//   useEffect(()=>{
//     onAuthStateChanged(auth,(currentUser)=>{
//       setUser(currentUser)
//       console.log('auth',currentUser.photoURL)
      
//     })
//   },[])


// const logOut=()=>{
//   signOut(auth)
// }

//   console.log('signInWithGoogle',Imgurl)
  return (
    <div>
       <p>Sign In With Google to Continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
        

      <img src={user?.photoURL} />
      <h2>{user?.displayName}</h2> 
      <button onClick={logOut}>LogOut</button>


    </div>
  )
}

export default Home