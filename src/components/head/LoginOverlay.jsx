import { SigninBtn } from "../index";
import { IMAGE_URL } from "../../utils/constants";

const LoginOverlay = ({ visible, onClose }) => (
  <div className="w-full">
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black/50 z-30 transition-opacity ${
        visible ? "visible opacity-100" : "invisible opacity-0"
      }`}
    />
    <div
      className={`bg-white fixed top-0 right-0 h-full w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] z-40 p-5 transition-transform duration-500 ${
        visible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="m-3 w-full lg:w-[60%]">
        <i className="fi fi-br-cross cursor-pointer" onClick={onClose}></i>
        <div className="my-10 flex justify-between items-center">
          <h2 className="font-bold text-3xl sm:text-4xl border-b-2 border-black pb-3 sm:pb-5">
            Login
          </h2>
          <img
            className="w-24 sm:w-28"
            src={`${IMAGE_URL}fl_lossy,f_auto,q_auto/Image-login_btpq7r`}
            alt="LOGIN"
            loading="lazy"
            width={112}
            height={112}
          />
        </div>
        <SigninBtn />
        <p className="text-sm mt-2 opacity-70">
          By clicking on Login, I accept the Terms & Conditions & Privacy Policy
        </p>
      </div>
    </div>
  </div>
);

export default LoginOverlay;
