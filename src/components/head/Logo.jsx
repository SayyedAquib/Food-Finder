import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="w-20">
        <img
          src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png"
          alt="Swiggy Logo"
          width={80}
          height={80}
          fetchpriority="high"
        />
      </div>
    </Link>
  );
};

export default Logo;
