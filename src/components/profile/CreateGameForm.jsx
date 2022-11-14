import React from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"
import {useState, useContext, useEffect} from "react"
import { getDefaultNormalizer } from '@testing-library/react'
import { createGameService } from '../../services/game.services'


function CreateGameForm() {
  const navigate = useNavigate()
  

  const [nameInput, setNameInput] = useState("")
  const [descriptionInput, setDescriptionInput] = useState("")
  const [pictureInput, setPictureInput] = useState("")

  const handleNameChange = (e) => setNameInput(e.target.value)
  const handDescriptionChange = (e) => setDescriptionInput(e.target.value)
  const handlePictureChange = (e) => setPictureInput(e.target.value)

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const gameToAdd = {
      name: nameInput,
      descritption: descriptionInput,
      picture:pictureInput,
      
    }
    
    try {
  
      await createGameService(gameToAdd)
      navigate("/")
  
      
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
          <Form.Control value ={descriptionInput} onChange={handlePictureChange} type="file" />
        </Form.Group>
          
                
        
       
        <Button type="submit" onClick={handleSubmit}>Create Tourney</Button>
      </fieldset>
    </Form>
                  


    </div>
  )
}

export default CreateGameForm