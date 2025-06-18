import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-2xl mb-2">Page Not Found</p>
      <p className="text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
