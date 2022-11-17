

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { detailsUserService, updateUserService } from '../../services/profile.services'

import Button from 'react-bootstrap/Button';
import { uploadPictureService } from '../../services/upload.services';

function InfoEdit() {
   const navigate = useNavigate()
   const {userId} = useParams()
   console.log("potau",userId)
   const [usernameInput, setUserNameInput] = useState("")
   const [emailInput, setEmailInput] = useState("")

   const [isLoadingPicture, setIsLoadingPicture] = useState(false)
   const [pictureURL, setPictureUrl] = useState("")

   useEffect(() => {
    getData()
   },[])
   const getData = async () => {
    try {
      const response = await detailsUserService(userId)
      console.log( "response",response)

      setUserNameInput(response.data.username)
      setEmailInput(response.data.email)
     
      
    } catch (error) {
      navigate("/error")
    }
   }

 
  const usernameChange = (event) => setUserNameInput(event.target.value)
  const emailChange = (event) => setEmailInput(event.target.value)
  
  const pictureChange = async (e) => {
    setIsLoadingPicture(true)

    const sendObj = new FormData()
    sendObj.append("picture",e.target.files[0])
    
    try {
      const response = await uploadPictureService(sendObj)
  
      setPictureUrl(response.data.picture)
      setIsLoadingPicture(false)
    } catch (error) {
      navigate("/error")
      
    }


  }
  const handleUpdate = async (event) => {
    event.preventDefault()

    const userUpdate = {
      username:usernameInput,
      email: emailInput,
      picture: pictureURL
    }
     
    try {
      await updateUserService(userId, userUpdate)
  
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
        <input type="file" name="picture" onChange={pictureChange}/>
        <br />
        {isLoadingPicture === true && <p>...loading picture</p>}
{pictureURL !== "" ? <img src={pictureURL} alt="pict" width={200}/> : <p>Choose image</p>}
        <Button onClick={handleUpdate}>Edit</Button>
      </form>

    </div>

  
    </div>
  )
}

export default InfoEdit