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
    <nav className="nav-bar">
      {isLoggedIn === true ? (
        <div className="full-nav">
          <div>
            <img src="../../images/nav-logo.png" alt="nav-logo" /> eS-Challenge
          </div>

          <div>
            <Link to="/">Home</Link>

            <Link to="/tourneys">Tourneys</Link>
            <Link to="/teams">Teams</Link>
            <Link to="/about">About</Link>
            <Link to="/profile">Profile</Link>
          </div>

          <div id="auth">
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        </div>
      ) : (
        <div className="full-nav">
          <div>
            <Link href="/" id="brand">
              <img src="../../images/nav-logo.png" alt="nav-logo" />
              eS-Challenge
            </Link>
          </div>

          <div>
            <Link to="/">Home</Link>
            <Link to="/tourneys">Tourneys</Link>
            <Link to="/teams">Teams</Link>
            <Link to="/about">About</Link>
          </div>

          <div id="auth">
            <Link to="/signup">Signup</Link>
            <Link to="/login">login</Link>
          </div>
          
        </div>
      )}
    </nav>
  );
}

export default NavBar;
