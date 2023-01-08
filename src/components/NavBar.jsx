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
        <div className="full-nav">
          
          <Link to="/" id="brand">
            <img src="../../images/nav-logo.png" alt="nav-logo" width={30} style={{marginBottom: "10px" }} /> eS-Challenge
          </Link>
          
          <nav>
            <Link to="/">Home</Link>

            <Link to="/tourneys">Tourneys</Link>
            <Link to="/teams">Teams</Link>
            <Link to="/about">About</Link>
            <Link to="/profile">Profile</Link>
            <Link to="#"></Link>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </nav>
        </div>
      ) : (
        <div className="full-nav">
          <Link href="/" id="brand">
            eS-Challenge
          </Link>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/tourneys">Tourneys</Link>
            <Link to="/teams">Teams</Link>
            <Link to="/about">About</Link>
            <Link to="#"></Link>
            <Link to="/signup">Signup</Link>
            <Link to="/login">login</Link>
          </nav>
        </div>
      )}
    </div>
  );
}

export default NavBar;
