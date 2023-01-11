

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
    <div>
      <div>
      
      <h3>Edit User</h3>
      <Form style={{display:"block",width:"80%", margin:"auto"}}>
      <fieldset >
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control value ={usernameInput} onChange={usernameChange} id="disabledTextInput" placeholder="username" />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control value ={emailInput} onChange={emailChange} id="disabledTextInput" placeholder="email@email.com" />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label htmlFor="picture">Picture</Form.Label>
          <Form.Control onChange={pictureChange} type="file" name="picture" />
        </Form.Group>
          
                
        
        {isLoadingPicture === true && <p>...loading picture</p>}
{pictureURL !== "" ? <img src={pictureURL} alt="pict"/> : <p>Choose image</p>}
        
        <Button type="submit" onClick={handleUpdate} variant="outline-secondary" id="button-addon3">Edit User</Button>
      </fieldset>
    </Form>

      {/* <form>

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
      </form> */}

    </div>

  
    </div>
  )
}

export default InfoEdit