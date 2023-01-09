import { singupService } from "../../services/auth.services";
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
        if ((error.response && error.response.status === 406) || (error.response && error.response.status === 400)) {
          setErrorMessage(error.response.data.errorMessage)
        }else{
          navigate("/error")
        }
       
      }


  };

  return (
    <section id="sign-up-container">
    

      <div className="sign-up-container">
       
        <form>
        <h3>Sign-Up</h3>
        
        
          <label htmlFor="username">User Name</label>
          <input value ={usernameInput} onChange={handleUsernameChange} id="disabledTextInput" placeholder="userName" />
        
        
          <label htmlFor="username">Em@il:</label>
          <input value ={emailInput} onChange={handleEmailChange} id="disabledTextInput" placeholder="Em@il:" />
       
        
          <label htmlFor="password">Password</label>
          <input value ={passwordInput} type="password" onChange={handlePasswordChange} id="disabledTextInput" placeholder="password" />
        
        
        {errorMessage !== "" && <p className="error-message">{errorMessage}</p>}
    
        <button type="submit" onClick={handleSignup} variant="outline-secondary" id="button-addon3">Register</button>
      
      </form>
      </div>

      <div className="sign-up-picture">
        <img src="../../../images/signup-pic1.jpg" alt="sign-up-logo" />
        </div>

    </section>





   
  );
}

export default Signup;