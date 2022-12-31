// Context
import { useContext } from "react";
import { AuthContext } from "../context/auth.context.js";

// Navigation
import { useNavigate, Link } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const { authenticateUser, isLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/");
  };

  return (
    <div className="nav-bar">
      {isLoggedIn === true ? (
        <div>
          <Link to="/" id="brand">eS-Challenge</Link>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/tourneys">Tourneys</Link>
            <Link to="/teams">Teams</Link>
            <Link onClick={handleLogout}>Logout</Link>
          </nav>
        </div>
      ) : (
        <div>
          <Link href="/" id="brand">eS-Challenge</Link>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/teams">Teams</Link>
            <Link to="/tourneys">Tourneys</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/login">login</Link>
          </nav>
        </div>
      )}
    </div>
  );
}

export default NavBar;
