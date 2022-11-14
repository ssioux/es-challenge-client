import React from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"
import {useState, useContext, useEffect} from "react"


import { createTeamService } from '../../services/team.services'

function CreateTeamForm() {
  const navigate = useNavigate()
  

  const [nameInput, setNameInput] = useState("")
  const [nameTagInput, setNameTagInput] = useState("")
  const [pictureInput, setPictureInput] = useState()
  const [joinPasswordInput, setJoinPasswordInput] = useState("")

  const handleNameChange = (e) => setNameInput(e.target.value)
  const handNameTagChange = (e) => setNameTagInput(e.target.value)
  const handlePictureChange = (e) => setPictureInput(e.target.value)
  const handleJoinPasswordChange = (e) => setJoinPasswordInput(e.target.value)

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const teamToCreate = {
      name: nameInput,
      nameTag: nameTagInput,
      picture: pictureInput,
      joinPassword: joinPasswordInput
      
    }
    
    try {
  
      await createTeamService(teamToCreate)
      navigate("/profile")
  
      
    } catch (error) {
      navigate("/error")
      
    }
  }


  return (
    <div style={{display:"flex",
      justifyContent:"center",
     alignItems:"center", flexDirection:"column"}} >
        <h1>Create new Team</h1>
        <hr />
           <Form style={{display:"flex"}}>
      <fieldset >
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="Name">Name</Form.Label>
          <Form.Control value ={nameInput} onChange={handleNameChange} id="disabledTextInput" placeholder="Name of Team" />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label htmlFor="nameTagdescription">Name Tag:</Form.Label>
          <Form.Control value ={nameTagInput} onChange={handNameTagChange} id="disabledTextInput" placeholder="Your Tag" />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label htmlFor="picture">Picture</Form.Label>
          <Form.Control value ={pictureInput} onChange={handlePictureChange} type="file" />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label htmlFor="joinPassword">JoinPassword: </Form.Label>
          <Form.Control value ={joinPasswordInput} onChange={handleJoinPasswordChange} type="text" placeholder="Password for user to join" />
        </Form.Group>
          
                
        
       
        <Button type="submit" onClick={handleSubmit}>Create your Team</Button>
      </fieldset>
    </Form>
                  


    </div>
  )
}
  

export default CreateTeamForm