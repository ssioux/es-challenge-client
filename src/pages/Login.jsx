import { useState } from "react";
import { loginService } from "../services/auth.services";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Login() {
  const { authenticaUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    // 1. replicate user credentials
    const userCredentials = {
      email: email,
      password: password,
    };

    try {
      // 2.Contact BE to validate it
      const response = await loginService(userCredentials);
      // 3. Token received and save it in localStorage

      localStorage.setItem("authToken", response.data.authToken);

      authenticaUser(); // Validate Token

      // ! redireccionar al usuario
      navigate("/profile");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div>
      <h1>Log In</h1>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <button type="submit">Login</button>

        {errorMessage !== "" && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Login;
