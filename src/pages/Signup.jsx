import { singupService } from "../services/auth.services";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
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
       
      }


  };

  return (
    <div>
      <h2>signup</h2>
 
<Form style={{display:"block" , width:"25%",color:"white", margin:"auto"}}>
      <fieldset >
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="username">username</Form.Label>
          <Form.Control value ={usernameInput} onChange={handleUsernameChange} id="disabledTextInput" placeholder="username" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="username">Em@il:</Form.Label>
          <Form.Control value ={emailInput} onChange={handleEmailChange} id="disabledTextInput" placeholder="Em@il:" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control value ={passwordInput} type="password" onChange={handlePasswordChange} id="disabledTextInput" placeholder="password" />
        </Form.Group>
        
        
    
        <Button type="submit" onClick={handleSignup} variant="outline-secondary" id="button-addon3">Signup</Button>
      </fieldset>
    </Form>







    </div>
  );
}

export default Signup;