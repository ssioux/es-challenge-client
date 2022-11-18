import React from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"
import {useState, useContext, useEffect} from "react"

import { createGameService } from '../../services/game.services'
import { uploadPictureService } from '../../services/upload.services'


function CreateGameForm() {
  const navigate = useNavigate()
  

  const [nameInput, setNameInput] = useState("")
  const [descriptionInput, setDescriptionInput] = useState("")
 

  const [isLoadingPicture, setIsLoadingPicture] = useState(false)
  const [pictureURL, setPictureUrl] = useState("")

  const handleNameChange = (e) => setNameInput(e.target.value)
  const handDescriptionChange = (e) => setDescriptionInput(e.target.value)
 
 
  const handlePictureChange = async (e) => {
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

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const gameToAdd = {
      name: nameInput,
      description: descriptionInput,
      picture:pictureURL,
      
    }
    
    try {
  
      await createGameService(gameToAdd)
      navigate("/profile")
  
      
    } catch (error) {
      navigate("/error")
      
    }
  }




  return (
    <div style={{display:"flex",
      justifyContent:"center",
     alignItems:"center", flexDirection:"column"}} >
        <h1>Create new Game</h1>
        <hr />
           <Form style={{display:"flex"}}>
      <fieldset >
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="Name">Name</Form.Label>
          <Form.Control value ={nameInput} onChange={handleNameChange} id="disabledTextInput" placeholder="Name of Game" />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label htmlFor="description">Description</Form.Label>
          <Form.Control value ={descriptionInput} onChange={handDescriptionChange} id="disabledTextInput" placeholder="Description of Game" />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label htmlFor="picture">Picture</Form.Label>
          <Form.Control onChange={handlePictureChange} type="file" name="picture" />
        </Form.Group>
          
                
        
        {isLoadingPicture === true && <p>...loading picture</p>}
{pictureURL !== "" ? <img src={pictureURL} alt="pict"/> : <p>Choose image</p>}
        
        <Button type="submit" onClick={handleSubmit}>Create Game</Button>
      </fieldset>
    </Form>
                  


    </div>
  )
}

export default CreateGameForm