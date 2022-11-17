import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context.js";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  const { authenticateUser, isLoggedIn } = useContext(AuthContext);
  
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  return (
    <div>
 {isLoggedIn === true ? (
 <>
<Navbar bg="dark" variant="dark">
  <Container>
    <Navbar.Brand href="#home">eS-Challenge</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/profile">Profile</Nav.Link>
      <Nav.Link href="/teams">Teams</Nav.Link>
      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
    </Nav>
  </Container>
</Navbar>
</>
 ):(
<>
<Navbar bg="dark" variant="dark">
  <Container>
    <Navbar.Brand href="#home">eS-Challenge</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/teams">Teams</Nav.Link>
    </Nav>
  </Container>
</Navbar>
</>

 )}
 
</div>
  );
}


export default NavBar;

