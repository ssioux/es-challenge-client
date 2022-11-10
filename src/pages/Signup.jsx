import { singupService } from "../services/auth.services";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [usernameInput, setUsername] = useState("");
  const [emailInput, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");
  // const [confirmPasswordInput, setConfirmPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  // const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value)

  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = {
      username: usernameInput,
      email: emailInput,
      password: passwordInput,
    };


      try {
        await singupService(newUser)
        navigate("/login")
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrorMessage(error.response.data.errorMessage)
        }
        navigate("/error")
      }


  };

  return (
    <div>
      <h2>signup</h2>
      <form onSubmit={handleSignup}>
        <label>UserName: </label>
        <input
          type="text"
          name="username"
          value={usernameInput}
          onChange={handleUsernameChange}
        />
        <hr />
        <label>Em@il: </label>
        <input
          type="email"
          name="email"
          value={emailInput}
          onChange={handleEmailChange}
        />
        <hr />
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={passwordInput}
          onChange={handlePasswordChange}
        />
        <hr />
        {/* <label>Confirm Password: </label>
      <input type="password" name="confirmPassword" value={confirmPasswordInput} onChange={handleConfirmPasswordChange}/>
      <hr /> */}
        <button>Submit</button>
        {errorMessage !== "" && <p style={{color: "red"}}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Signup;