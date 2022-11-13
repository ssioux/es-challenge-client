import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context.js";
// import MyVerticallyCenteredModal from "../pages/MyVerticallyCenteredModal"
// import Button from 'react-bootstrap/Button';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/auth.services";
import { singupService } from "../services/auth.services";

function NavBar() {

  // Modal Show Loogin States
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showSignup, setShowSignup] = useState(false);

  const handleCloseSignup = () => setShowSignup(false);
  const handleShowSignup = () => setShowSignup(true);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  // ! desde aqui
  const { authenticateUser, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // START LOGIN MODAL

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    // 1. To take credential user info.
    const userInfo = {
      email: email,
      password: password,
    };

    try {
      // 2. Contact BE To validate it
      const response = await loginService(userInfo);

      // 3. Token received so we save it into localStorage
      localStorage.setItem("authToken", response.data.authToken);

      authenticateUser(); // invokoe to validate user
      navigate("/profile");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  // END LOGIN MODAL * START SIGNUP MODAL

  const [usernameSignup, setUsernameSignup] = useState("");
  const [emailSignup, setEmailSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");
  // const [confirmPasswordInput, setConfirmPassword] = useState("")
  const [errorMessageSignup, setErrorMessageSignup] = useState("");

  const handleUsernameSignupChange = (e) => setUsernameSignup(e.target.value);
  const handleEmailSignupChange = (e) => setEmailSignup(e.target.value);
  const handlePasswordSignupChange = (e) => setPasswordSignup(e.target.value);
  // const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value)

  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = {
      username: usernameSignup,
      email: emailSignup,
      password: passwordSignup,
    };

    try {
      await singupService(newUser);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      }
      navigate("/error");
    }
  };

  //! hasta aqui

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
          {/* <Link to="/login">Login</Link> * */}

          {/* INICIO MODAL SIGNUP */}
          <>
            <Button variant="primary" onClick={handleShowSignup}>
              ModalSignup
            </Button>

            <Modal show={showSignup} onHide={handleCloseSignup}>
              <Modal.Header closeButton>
                <Modal.Title>Signup Form</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>UserName</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="NickName"
                      autoFocus
                      value={usernameSignup}
                      onChange={handleUsernameSignupChange}
                    />
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      autoFocus
                      value={emailSignup}
                      onChange={handleEmailSignupChange}
                    />
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="password"
                      autoFocus
                      value={passwordSignup}
                      onChange={handlePasswordSignupChange}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseSignup}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSignup}>
                  Submit
                </Button>
                {errorMessageSignup !== "" && (
                  <p style={{ color: "red" }}>{errorMessageSignup}</p>
                )}
              </Modal.Footer>
            </Modal>
          </>

          {/* FIN MODAL SINGUP */}

          {/* INICIO MODAL LOGIN */}
          <>
            <Button variant="primary" onClick={handleShow}>
              ModalLogin
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Login Form</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      autoFocus
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="password"
                      autoFocus
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleLogin}>
                  Submit
                </Button>
                {errorMessage !== "" && (
                  <p style={{ color: "red" }}>{errorMessage}</p>
                )}
              </Modal.Footer>
            </Modal>
          </>

          {/* FIN MODAL LOGIN */}
        </div>
      )}
    </div>
  );
}

// render(<App />);
export default NavBar;
