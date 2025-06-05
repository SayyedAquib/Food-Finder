import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../config/firebaseAuth";
import { useDispatch, useSelector } from "react-redux";
import { addUserData, removeUserData } from "../utils/authSlice";
import { useNavigate } from "react-router-dom";
import { toggleLogin } from "../utils/toogleSlice";

const SigninBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.authSlice.userData);

  const handleAuth = async () => {
    let data = await signInWithPopup(auth, provider);
    const userData = {
      name: data.user.displayName,
      photo: data.user.photoURL,
    };
    dispatch(addUserData(userData));
    dispatch(toggleLogin());
    navigate("/");
  };

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(removeUserData());
    dispatch(toggleLogin());
  };

  return (
    <>
      {userData ? (
        <button
          onClick={handleLogout}
          className="my-5 w-full text-2xl p-5 bg-[#fc8019] text-white"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleAuth}
          className="my-5 w-full text-2xl p-5 bg-[#fc8019] text-white"
        >
          Login with GOOGLE
        </button>
      )}
    </>
  );
}

export default SigninBtn;
