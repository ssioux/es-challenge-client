import { createContext, useState, useEffect } from "react"
import { verifyService } from "../services/auth.services"
// import BounceLoader from "react-spinners/BounceLoader";

const AuthContext = createContext()

function AuthWrapper(props) {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ user, setUser ] = useState(null)
  const [ isFetching, setIsFetching ] = useState(true)

  useEffect(() => {
    authenticaUser()
  }, []) // Component Did Mount 

  const authenticaUser = async () => {
    // Run to validate Token and update states
    setIsFetching(true) 
    try {
      
      const response = await verifyService()
      console.log(response)
      // Token is validated
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