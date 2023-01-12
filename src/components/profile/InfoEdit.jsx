

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { detailsUserService, updateUserService } from '../../services/profile.services'
import Form from "react-bootstrap/Form"
import Button from 'react-bootstrap/Button';
import { uploadPictureService } from '../../services/upload.services';

function InfoEdit(props) {
   const navigate = useNavigate()
   const [usernameInput, setUserNameInput] = useState("")
   const [emailInput, setEmailInput] = useState("")

   const [isLoadingPicture, setIsLoadingPicture] = useState(false)
   const [pictureURL, setPictureUrl] = useState("")

   useEffect(() => {
    getData()
   },[])
   const getData = async () => {
    try {
      const response = await detailsUserService(props.id)
    

      setUserNameInput(response.data.username)
      setEmailInput(response.data.email)
     
      
    } catch (error) {
      navigate("/error")
    }
   }

 
  const usernameChange = (event) => setUserNameInput(event.target.value)
  const emailChange = (event) => setEmailInput(event.target.value)
  
  const pictureChange = async (event) => {
    setIsLoadingPicture(true)

    const sendObj = new FormData()
    sendObj.append("picture",event.target.files[0])
    
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
      await updateUserService(props.id, userUpdate)
        props.updateUser()
       navigate("/logout")
      
    } catch (error) {
      navigate("/error")
    }

  }
    

  

  return (
    <div id="user-edit-container">
      <div className="create-team-container">
      
     
      <form >
       <h3>Edit User</h3>
      
        <div className="input-container">
           <input value ={usernameInput} onChange={usernameChange} id="disabledTextInput" />
          <label className={usernameInput && "filled"} htmlFor="username">Username</label>
         
       </div>

       <div className="input-container">
        <input value ={emailInput} onChange={emailChange} id="disabledTextInput"  />
        <label className={emailInput && "filled"} htmlFor="email">Email</label>
          
        </div>

        <div className="uploader-pic">
         <input onChange={pictureChange} type="file" name="picture" />
        <label  htmlFor="picture">Picture</label>
         
    </div>
          
                
        
        {isLoadingPicture === true && <p>...loading picture</p>}
{pictureURL !== "" ? <img src={pictureURL} alt="pict" className="uploader-img" /> : <p>[ No Picture Selected ]</p>}
        
        <button type="submit" onClick={handleUpdate} >Edit User</button>
     
    </form>


    </div>

  
    </div>
  )
}

export default InfoEdit