import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
//import Modal from "./Modal";

export default function Navbar() {
  const { user, dispatch } = useAuth();
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };
  return (
    <nav className="flex justify-between items-center mx-auto p-2 w-[40%] text-xl h-[10%] text-gray-500">
      {/* <Modal /> */}
      <Link to="/">
        <img src="./node.js.svg" alt="mern-auth-logo" className="w-10" />
      </Link>
      <ul className="flex gap-8">
        <li>
          <Link to="/">Home</Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
          </>
        ) : (
          <>
          <li>
            <div className="cursor-pointer font-bold">
              {user?.email}
            </div>
          </li>
          <li>
            <div className="cursor-pointer" onClick={logout}>
              Log out
            </div>
          </li>
          </>
        )}
      </ul>
    </nav>
  );
}
