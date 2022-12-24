import { clearIndexedDbPersistence, QuerySnapshot } from 'firebase/firestore'
import React,{useEffect,useState} from 'react'
import { db } from '../FirebaseConfig'
import { onSnapshot,collection, getDocs, addDoc, deleteDoc, doc,orderBy ,  updateDoc,getDoc } from "firebase/firestore";


const Chat = ({user}) => {
  const [messages,setMessages] =useState([])

  const [chat,setChats] = useState('')

  //   useEffect(()=>{
  //   getmessages()
  // },[])
console.log('userrr', user)
  useEffect(() => {
   const unsub =    onSnapshot(collection(db,"messages"), (snapshot) =>
   setMessages(snapshot.docs.map((doc) => doc.data()))
  );
  return unsub

  
    },[])


      const sendMessages = async (e)=>{
      e.preventDefault();
    const chatsCollectionRef = collection(db, "messages")
    try{
     await addDoc(chatsCollectionRef,{text:chat})
     console.log('sucsess')
    }
  catch(err){
    console.error(err)

  }
}
    //  const getmessages =  ()=>{
    //   const postcollection = collection(db,'messages')
    //   const data = getDocs(postcollection).then((res)=>{
    //     // const messagesRef = res.docs.map(doc =>({
    //     //      data: doc.data(),
    //     //      id: doc.id
    //     // }))
   
    //     setMessages(unsub)
    //   })
    //   // const Order = data.orderBy('createdAt')
          
      // }

  
  // useEffect(()=>{
  //   if(db){
  //  const msg =  db.collection('messages').orderBy('createdAt').limit(100).onSnapshot(querySnapshot=>{
  //   const data = querySnapshot.docs.map(doc => ({
  //     ...doc.data(),
  //     id:doc.id,
  //   }))
  //   setMessages(data)
  //  })
  //     return msg
  //   }
  // },[db])


   
console.log('sucsess',messages)

  return (
    <div>
      <h1>Mychat Room</h1>
      
    {
      messages.map((message)=>{
        return (
          <div key={message.id}>
            <p>{user?.displayName}</p>
            <img src={user?.photoURL} />
            <p>{message.text}</p>
           </div>
        )
      })
    }

    <div>
      <form onSubmit={sendMessages}>
      <input value={chat} onChange={(e)=>{setChats(e.target.value)}}></input>
      <button type='submit'>Send</button>

      </form>
    
    </div>
    </div>

  )
}

export default Chat