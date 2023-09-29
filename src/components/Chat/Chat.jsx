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
      <div className="chat-app">
        <div>
          <h1>welcome to: {room.toUpperCase()}</h1>
        </div>
        <div>
          {Message.map((Message) => (
            <h1>{Message.text}</h1>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="new-message-form">
          <input
            className="new-message-form"
            placeholder="Type your message"
            onChange={(e) => setnewMessage(e.target.value)}
            value={newMessage}
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default Chat;
