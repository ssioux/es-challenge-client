import TourneyFinishedList from "../components/home/TourneyFinishedList";
import TourneyList from "../components/home/TourneyList";
import TeamList from "../components/profile/TeamList";

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
import { uploadPictureService } from "../services/upload.services.js";
import Profile from "../components/profile/Profile";

function Home() {
  // Modal Show Loogin States
  const [show, setShow] = useState(false);
  const [pictureUrl, setPictureUrl] = useState("");
  const [isLoadingPicture, setIsLoadingPicture] = useState(false);

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
      setShowSignup(false);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessageSignup(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  const handleUploadImage = async (event) => {
    setIsLoadingPicture(true);
    console.log(event.target.files[0]);

    const sendObj = new FormData();
    sendObj.append("picture", event.target.files[0]);
    setIsLoadingPicture(false);
    try {
      const response = await uploadPictureService(sendObj);
      console.log(response.data.picture);
      setPictureUrl(response.data.picture);
    } catch (error) {
      navigate("/error");
    }
  };

  //! hasta aqui

  return (
    <div
      style={{
        display: "flex",
        margin: "auto",
        width: "80%",
        justifyContent: "space-between",
      }}
    >
      <div>
        {isLoggedIn === true ? (
          <div>
            <Profile />
          </div>
        ) : (
          <div>
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
                        type="text"
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
                      <Form.Label htmlFor="picture">Image</Form.Label>
                      <Form.Control
                        name="picture"
                        type="file"
                        placeholder="choose image"
                        onChange={handleUploadImage}
                      />
                    </Form.Group>
                  </Form>
                  {isLoadingPicture === true && <p>...loading picture</p>}
                  {pictureUrl !== "" ? (
                    <img src={pictureUrl} alt="pict" width={200} />
                  ) : (
                    <p>Choose image</p>
                  )}
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
      <div>
          <TourneyList />
        </div>

        <br />

        <div>
          <TeamList />
        </div>
    </div>
  );
}

export default Home;
