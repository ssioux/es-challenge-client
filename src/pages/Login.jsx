import { useState } from "react";
import { loginService } from "../services/auth.services"
import { useNavigate } from "react-router-dom"

import { useContext } from "react"
import { AuthContext } from "../context/auth.context";

function Login() {

  const { authenticaUser } = useContext(AuthContext)   

  // configuramos el uso de navigate
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    // ... login logic here

    // 1. recopilar las credenciales del usuario
    const userCredentials = {
      email: email,
      password: password
    }

    try {
      // 2. contactar con el backend para validarlo
      const response = await loginService(userCredentials)
      
      // 3. recibir el Token
      // console.log(response.data.authToken)
  
      // 4. hacer algo con el Token?
      
      // metodo de localStorage para guardar info => localStorage.setItem()
      localStorage.setItem("authToken", response.data.authToken)
      // arg1. el nombre de lo que vamos a guardar
      // arg2. el valor de lo qe vamos a guardar

      // en este punto nosotros tenemos que guardar informacion de que el usuario se ha logeado
      // esta info estará en un estado global (context)
      authenticaUser() // invocar la funcion de context que valida el Token

      // ! redireccionar al usuario
      navigate("/profile")


    } catch (error) {
      if (error.response && error.response.status === 400) {
        // si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // si el error es otro (500) entonces si redirecciono a /error
        navigate("/error")
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
