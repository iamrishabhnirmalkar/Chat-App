import { auth, provider } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Auth = (props) => {
  const { setIsAuth } = props;

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.log(Err);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center bg-slate-700">
        <p className="text-white font-bold">Sign In With Google To Continue</p>
        <button
          onClick={signInWithGoogle}
          className="inline-flex items-center justify-center rounded-lg px-4 py-2 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 font-bold"
        >
          Sign In With Google
        </button>
      </div>
    </>
  );
};

export default Auth;
