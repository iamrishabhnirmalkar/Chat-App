import { useState, useRef } from "react";
import "./index.css";
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
    <div className="h-screen flex justify-center items-center bg-slate-700">
      <div className="text-center">
        {room ? (
          <Chat room={room} />
        ) : (
          <div className="max-w-md mx-auto p-4">
            <label className="text-white mb-2">Enter Room Name</label>

            <div className="flex items-center space-x-4">
              <input
                ref={roomInputRef}
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
                placeholder="Room Name"
              />
              <button
                className="inline-flex items-center justify-center rounded-lg px-4 py-2 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                onClick={() => setRoom(roomInputRef.current.value)}
              >
                Enter Chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
