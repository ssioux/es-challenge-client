// Context
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context.js";

// Navigation
import { useNavigate, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";

function NavBar() {
  const navigate = useNavigate();
  const { authenticateUser, isLoggedIn } = useContext(AuthContext);

  // Burger
  const [open, setOpen] = useState(false);

  const burgerIsReady = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    burgerIsReady ? setOpen(true) : setOpen(false);
  }, [burgerIsReady]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/");
  };

  return (

   

    <nav className="nav-bar">
      <div className="full-nav-burger">
        <div>
          <img src="../../images/nav-logo.png" alt="nav-logo" /> eS-Challenge
        </div>
        <div className="burger" open={open} onClick={() => setOpen(!open)}>
          <div id="one" />
          <div id="two" />
          <div id="three" />
        </div>
      </div>
      {!open ? (
        isLoggedIn === true ? (
          <div className="full-nav">
            <div id="brand">
              <img src="../../images/nav-logo.png" alt="nav-logo" />{" "}
              eS-Challenge
            </div>

            <div className="links">
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
          <div id="brand">
            
              <img src="../../images/nav-logo.png" alt="nav-logo" /> eS-Challenge
            
          </div>

            <div className="links">
              <Link to="/">Home</Link>
              <Link to="/tourneys">Tourneys</Link>
              <Link to="/teams">Teams</Link>
              <Link to="/about">About</Link>
            </div>

            <div className="auth">
              <Link to="/signup">Signup</Link>
              <Link to="/login">login</Link>
            </div>
          </div>
        )
      ) : null}
    </nav>
  );
}

export default NavBar;
