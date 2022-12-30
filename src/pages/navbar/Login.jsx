import { useState } from "react";
import { loginService } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"



import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Login() {
  const { authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

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

  return (
    <div>
      <h1>Log In</h1>

<Form style={{display:"block" , width:"25%",color:"white", margin:"auto"}}>
      <fieldset >
      
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="username">Em@il:</Form.Label>
          <Form.Control value ={email} onChange={handleEmailChange} id="disabledTextInput" placeholder="Em@il:" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control value ={password} type="password" onChange={handlePasswordChange} id="disabledTextInput" placeholder="password" />
        </Form.Group>
        
        {errorMessage !== "" && <p style={{ color: "red" }}>{errorMessage}</p>}
    
        <Button type="submit" onClick={handleLogin} variant="outline-secondary" id="button-addon3">Login</Button>
      </fieldset>
    </Form>


      {/* <form onSubmit={handleLogin}>
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

        {errorMessage !== "" && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form> */}
    </div>
  );
}

export default Login;
