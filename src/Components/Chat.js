import { clearIndexedDbPersistence, QuerySnapshot } from 'firebase/firestore'
import React,{useEffect,useState} from 'react'
import { db } from '../FirebaseConfig'
import { serverTimestamp,query,onSnapshot,collection, getDocs, addDoc, deleteDoc, doc,orderBy ,limit,  updateDoc,getDoc } from "firebase/firestore";
import { formatRelative } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const Chat = ({user}) => {
  const [messages,setMessages] =useState([])
  const [chat,setChats] = useState('')
  const photo=user.photoURL
  console.log(photo)
  const id  = uuidv4()
  console.log(id)

console.log('userrr', user)
  useEffect(() => {
    const collectionRef =query(collection(db, "messages"),orderBy('createdAt'))
   const unsub= onSnapshot(collectionRef, (snapshot) =>
   setMessages(snapshot.docs.map((doc) => doc.data()))
  )
  return unsub

  
    },[])


    const sendMessages = async (e)=>{
      e.preventDefault();
    const chatsCollectionRef = collection(db, "messages")
    try{
     await addDoc(chatsCollectionRef,{text:chat,createdAt:serverTimestamp(),id:id,imgUrl:photo})
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
const formatDate = date => {
  let formattedDate = '';
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = formatRelative(date, new Date());
    // Uppercase the first letter
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

  return (
    <div>
      <h1>Mychat Room</h1>
      
    {
      messages.map((message)=>{
        return (
          <div key={message.id}>
            {message.createdAt?.seconds ? (
            <span >
              {formatDate(new Date(message.createdAt.seconds * 1000))}
            </span>
          ) : null}
          <img src={message.imgUrl} alt="img"/>
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