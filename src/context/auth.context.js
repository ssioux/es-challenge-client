import { createContext, useState, useEffect } from "react"
import { verifyService } from "../services/auth.services"
// import BounceLoader from "react-spinners/BounceLoader";

const AuthContext = createContext()

function AuthWrapper(props) {

  // .todos los estados y funciones globales
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ user, setUser ] = useState(null)
  const [ isFetching, setIsFetching ] = useState(true)

  useEffect(() => {
    authenticaUser()
  }, []) // Component Did Mount => el component que envuelve a App.

  const authenticaUser = async () => {
    // ejecutar para validar el token del usuario y actualizar los estados
    setIsFetching(true) // cambiar esto a true mientras se vuelve a validar el token
    try {
      
      const response = await verifyService()
      console.log(response)
      // a partir de este punto, el Token está validado en FE
      setIsLoggedIn(true)
      setUser(response.data)
      setIsFetching(false)

    } catch (error) {
      console.log(error)
      setIsLoggedIn(false)
      setUser(null)
      setIsFetching(false)
    }
  }

  const passedContext = {
    isLoggedIn,
    user,
    authenticaUser,
    setIsLoggedIn,
    setUser
  }

  if (isFetching === true) {
    return (
      <div className="App">
        <h3>... Validando al usuario</h3>
        
          {/* <BounceLoader size={100} color={"purple"}/> */}

      
      </div>
    )
  }
  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthWrapper
}