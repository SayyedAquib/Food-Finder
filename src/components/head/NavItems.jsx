import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const navItems = [
  { name: "Search", image: "fi-rr-search", path: "/search" },
  { name: "Sign in", image: "fi-rr-user", path: "/signin" },
  { name: "Cart", image: "fi-rr-shopping-cart-add", path: "/cart" },
];

const NavItems = ({ onLoginClick }) => {
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const userData = useSelector((state) => state.authSlice.userData);

  const renderItem = (data, isMobile = false) => {
    const common = (
      <>
        <i className={`fi text-xl text-gray-700 ${data.image}`} />
        {data.name === "Cart" && (
          <sup className="text-lg">{cartData.length}</sup>
        )}
      </>
    );

    if (data.name === "Sign in") {
      return (
        <div onClick={onLoginClick} key={data.path} className="cursor-pointer">
          <div className="flex items-center gap-3">
            {userData ? (
              <img
                className="w-8 h-8 rounded-full"
                src={userData.photo}
                alt="User"
                fetchPriority="high"
                width={32}
                height={32}
              />
            ) : (
              common
            )}
            {!isMobile && (
              <p className="text-base font-medium text-gray-700">
                {userData ? userData.name : data.name}
              </p>
            )}
          </div>
        </div>
      );
    }

    return (
      <Link to={data.path} key={data.path} className="flex items-center gap-2">
        {common}
        {!isMobile && (
          <p className="text-base font-medium text-gray-700">
            {data.name !== "Cart" && data.name}
          </p>
        )}
      </Link>
    );
  };

  return (
    <>
      <div className="hidden md:flex items-center gap-4 lg:gap-14">
        {navItems.map((item) => renderItem(item))}
      </div>
      <div className="flex md:hidden items-center gap-4 sm:gap-10">
        {navItems.map((item) => renderItem(item, true))}
      </div>
    </>
  );
};

export default NavItems;
