import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase-config";

function Chat(props) {
  const { room } = props;
  const [newMessage, setnewMessage] = useState("");
  const [Message, setMessage] = useState([]);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessage = query(messagesRef, where("room", "==", room));
    const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
      let message = [];
      snapshot.forEach((doc) => {
        message.push({ ...doc.data(), id: doc.id });
      });
      setMessage(message);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setnewMessage("");
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center bg-slate-700">
        <div className="text-white">
          <h1 className="text-2xl font-semibold">
            welcome to: {room.toUpperCase()}
          </h1>
        </div>
        <div className="flex flex-col space-y-2">
          {Message.map((Message) => (
            <span className="text-gray-500 font-semibold">{Message.text}</span>
          ))}
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex justify-between items-center"
        >
          <div className="flex items-center space-x-4 mb-4">
            <input
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
              placeholder="Type your message"
              onChange={(e) => setnewMessage(e.target.value)}
              value={newMessage}
            />
            <button
              type="submit"
              className=" inline-flex items-center justify-center rounded-lg px-4 py-2 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Chat;
