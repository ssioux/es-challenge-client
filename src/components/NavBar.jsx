import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context.js";

function NavBar() {
  const { authenticateUser, isLoggedIn, setUser, setIsLoggedIn } =
    useContext(AuthContext);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  return (
    <div>
      {isLoggedIn === true ? (
        <div>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link onClick={handleLogout}>Logout</Link>
        </div>
      ) : (
        <div>
          <Link to="/">Home</Link>

          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
}

export default NavBar;
