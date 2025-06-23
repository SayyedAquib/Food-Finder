import { Logo } from "../index";
import NavItems from "./NavItems";

const Navbar = ({ address, onAddressClick, onLoginClick }) => (
  <div className="relative w-full">
    <div className="sticky top-0 bg-white z-20 shadow-md h-20 sm:h-24 flex justify-center items-center">
      <div className="w-[95%] sm:w-[90%] lg:w-[80%] flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Logo />
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={onAddressClick}
          >
            <p className="flex items-center gap-1 text-sm sm:text-base">
              <span className="font-bold border-b-2 border-black">others</span>
              <span className="hidden md:block ml-2 max-w-[150px] sm:max-w-[250px] opacity-85 line-clamp-1">
                {address}
              </span>
            </p>
            <i className="fi text-xl sm:text-2xl text-orange-500 fi-rs-angle-small-down"></i>
          </div>
        </div>
        <NavItems onLoginClick={onLoginClick} />
      </div>
    </div>
  </div>
);

export default Navbar;
