

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { detailsUserService, updateUserService } from '../../services/profile.services'

function InfoEdit() {
   const navigate = useNavigate()
   const {userId} = useParams()
   const [usernameInput, setUserNameInput] = useState("")
   const [emailInput, setEmailInput] = useState("")
   const [pictureInput, setPictureInput] = useState("")

   useEffect(() => {
    getData()
   },[])
   const getData = async () => {
    try {
      const response = await detailsUserService(userId)
      console.log( "response",response)

      setUserNameInput(response.data.username)
      setEmailInput(response.data.email)
      setPictureInput(response.data.picture)
      
    } catch (error) {
      navigate("/error")
    }
   }

 
  const usernameChange = (event) => setUserNameInput(event.target.value)
  const emailChange = (event) => setEmailInput(event.target.value)
  const pictureChange = (event) => setPictureInput(event.target.value)

  const handleUpdate = async (event) => {
    event.preventDefault()

    const userUpdate = {
      username:usernameInput,
      email: emailInput,
      picture: pictureInput
    }
     
    try {
      await updateUserService(userId,userUpdate)
  
       navigate("/profile")
      
    } catch (error) {
      navigate("/error")
    }

  }
    
  return (
    <div>
      <div>
      
      <h3>Formulario Editar</h3>

      <form>

        <label htmlFor="username">Username: </label>
        <input type="text" name="username" value={usernameInput} onChange={usernameChange}/>
        <br />
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" value={emailInput} onChange={emailChange}/>
        <br />
        <label htmlFor="picture">Add picture</label>
        <input type="file" name="picture" checked={pictureInput} onChange={pictureChange}/>
        <br />
        <button onClick={handleUpdate}>Edit</button>
      </form>

    </div>

  
    </div>
  )
}

export default InfoEdit