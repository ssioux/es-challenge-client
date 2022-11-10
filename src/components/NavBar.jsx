import { useContext } from "react"
import { Link } from "react-router-dom"
import {AuthContext} from "../context/auth.context.js"

 

function NavBar() {

  const {authenticaUser} = useContext(AuthContext)
  const handleLogout = () => {
    localStorage.removeItem("authToken")
    authenticaUser()

  }

  return (
    <div>
        <h3>NavBar</h3>

        <Link to="/">Home</Link>

        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">Profile</Link>
        <Link onClick={handleLogout}>Logout</Link>


    </div>
  )
}

export default NavBar