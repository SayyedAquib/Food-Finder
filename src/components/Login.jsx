import { IMAGE_URL } from "../utils/constants";
import { SigninBtn } from "./index";

const Login = ({ handleLogin }) => {
  return (
    <div
      className="bg-white flex justify-end w-full md:w-[40%] h-full p-5 z-40 fixed"
      onClick={handleLogin}
    >
      <div className="m-3 w-full lg:w-[60%]">
        <i className="fi fi-br-cross" onClick={handleLogin}></i>
        <div className="my-10 w-full flex justify-between items-center">
          <h2 className="font-bold text-4xl border-b-2 border-black pb-5">
            Login
          </h2>
          <img
            className="w-28"
            src={`${IMAGE_URLL}fl_lossy,f_auto,q_auto/Image-login_btpq7r`}
            alt="Login"
          />
        </div>

        <SigninBtn />
        <p className="text-base mt-2 opacity-70">
          By clicking on Login, I accept the Terms & Conditions & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
