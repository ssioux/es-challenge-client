import { Link } from "react-router-dom"


function NavBar() {
  return (
    <div>
        <h3>NavBar</h3>

        <Link to="/">Home</Link>

        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/logout">Logout</Link>


    </div>
  )
}

export default NavBar