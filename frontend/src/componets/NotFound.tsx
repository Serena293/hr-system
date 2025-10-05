import { Link } from "react-router-dom";
import raccoonImage from "../assets/img/raccoon.png";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-green-50 text-gray-800">
      
      <img
        src={raccoonImage}
        alt="Lost raccoon"
        className="w-36 h-36 mb-6"
      />

      <h1 className="text-5xl font-bold text-green-700">404</h1>
      <p className="text-xl text-gray-600 mt-3">
        Oops! Looks like this raccoon got lost...
      </p>
      <p className="text-gray-500 mt-1">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/dashboard"
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
