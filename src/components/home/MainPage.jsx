import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Login from '../../pages/Login'
import Signup from '../../pages/Signup'


function MainPage() {
  const [signup, setSignup] = useState(false)
  const [login, setLogin] = useState(false)

const handleSignup = () => {
    setSignup(true)
    setLogin(false)

}
const handleLogin = () => {
    setLogin(true)
    setSignup(false)

}

  return (
    <div className='main-page'>
        <div className='eslogan'>
            <h1>esChallenge</h1>
            <h3>Electronic Sport Challenge</h3>
            <h2>THE NEXT TOURNEY GENERATOR</h2>
            <p>esChalleng ha sido creado para ofrecer la posibilidad de generar torneos online en cualquier modalidad de e-game.
               Para ello, lo único que tienes que hacer es registrarte, crear tu propio equipo y generar tu propio torneo o participar en 
               uno ya existente. Si tienes dudas sobre cómo hacerlo, visita las INSTRUCCIONES haciendo click aquí.
            </p>
        </div>

        <div className='register-login'>
             
             <div>
             {(signup === false && login === false) && <h1>div 2 main page</h1> }
             {(signup === true) && <Signup/>}
             {(login === true) && <Login/>}
             
             
             </div>
             <br/>
             <div>
        <Button type="submit" onClick={handleSignup} variant="primary" id="button-addon3">Signup</Button>
        <Button type="submit" onClick={handleLogin} variant="primary" id="button-addon3">Login</Button>

             </div>

        </div>
    </div>
  )
}

export default MainPage