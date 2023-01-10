import { useState } from "react";
import { loginService } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Login() {
  const { authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
 

  const handleEmailChange = (e) => {
    
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    
    setPassword(e.target.value);
  };

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

  return (
    <section id="log-in-container">
      <div className="log-in-picture">
        <img src="../../../images/login-pic3.jpg" alt="log-in-logo" />
      </div>

      <div className="log-in-container">
        <form>
          <h3>Log-In</h3>
          <div className="input-container">
            <input value={email} onChange={handleEmailChange} name="email" />
            <label className={email && "filled"} htmlFor="email">
              Email
            </label>
          </div>
          <div className="input-container">
            <input
              value={password}
              type="password"
              onChange={handlePasswordChange}
              name="password"
            />
            <label className={password && "filled"} htmlFor="password">
              Password
            </label>
          </div>

          {errorMessage !== "" && (
            <p style={{ color: "red" }}>{errorMessage}</p>
          )}

          <Button
            type="submit"
            onClick={handleLogin}
            variant="outline-secondary"
            id="button-addon3"
          >
            Login
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Login;
