import React, { useEffect, useState } from "react";
import { db } from "../FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";


import {
  serverTimestamp,
  query,
  onSnapshot,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  orderBy,
  limit,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { formatRelative } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../FirebaseConfig";



const Chat = ({ user, logOut }) => {
  const [messages, setMessages] = useState([]);
  const [currentUser] = useAuthState(auth);
  console.log('cureennt',currentUser)
  const [chat, setChats] = useState("");
  const photo = user.photoURL;
  const id = uuidv4();

  useEffect(() => {
    const collectionRef = query(
      collection(db, "messages"),
      orderBy("createdAt")
    );
    const unsub = onSnapshot(collectionRef, (snapshot) =>
      setMessages(snapshot.docs.map((doc) => doc.data()))
    );
    return unsub;
  }, []);

  const sendMessages = async (e) => {
    e.preventDefault();
    const chatsCollectionRef = collection(db, "messages");
    try {
      await addDoc(chatsCollectionRef, {
        text: chat,
        createdAt: serverTimestamp(),
        id: id,
        imgUrl: photo,
        userId:user.uid
      });
      console.log("sucsess");
    } catch (err) {
      console.error(err);
    }
  };


  const formatDate = (date) => {
    let formattedDate = "";
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
    <div className="bg-[#2C2A32] text-white">
      <h1 className="text-center text-3xl font-semibold p-3">My Chat Room</h1>
      <div className=" relative w-full md:max-w-[90%] overflow-auto  lg:h-[350px] mx-auto m-5 flex flex-col gap-5   p-4">
        {/* <h1 className="text-center p-2">Mychat Room</h1> */}

        {messages.map((message) => {
          // console.log(messages);
          console.log('ususuus',user)
          return (
            <div key={message.id} className={ message.userId===user.uid?" hover:bg-[#393642] p-4 duration-150  flex justify-end":"hover:bg-[#393642] p-4 duration-150  flex justify-start"}>
              <div className="flex items-center gap-2">
                <img
                  src={message.imgUrl}
                  alt="img"
                  className="h-10 w-10 rounded-full"
                />
                <div className="">
                  <div className="flex items-center gap-1">
                    <span className="sm:text-sm md:text-xl text-red-600">{user?.displayName}</span>
                    {message.createdAt?.seconds ? (
                      <span className="text-sm text-gray-500 mt-1">
                        {formatDate(new Date(message.createdAt.seconds * 1000))}
                      </span>
                    ) : null}
                  </div>
                  <p>{message.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="z-10 bottom-0 w-full max-w-[90%] mx-auto  rounded-lg px-2 bg-[#40444B]">
        <form onSubmit={sendMessages} className="flex w-full">
          <input
            className="w-full p-3 text-gray-400 bg-[#40444B] outline-none"
            placeholder="Type your message..."
            value={chat}
            onChange={(e) => {
              setChats(e.target.value);
            }}

          ></input>
          <button type="submit" disabled={!chat}  className=" flex items-center px-2 gap-1 text-xl text-gray-400 hover:text-white">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;