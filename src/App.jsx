import { useState, useRef } from "react";
import "./App.css";
import Auth from "./components/Auth/Auth";
import Cookies from "universal-cookie";
import Chat from "./components/Chat/Chat";

const cookies = new Cookies();

function App() {
  const [isAuth, setAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  if (!isAuth) {
    return (
      <>
        <Auth setAuth={setAuth} />
      </>
    );
  }
  return (
    <div>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <label>Enter Room Name </label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Enter Chat
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
