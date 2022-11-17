import React from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useNavigate , useParams} from "react-router-dom"
import {useState, useContext, useEffect} from "react"


import { createTeamService, findTeamCreatorService } from '../../services/team.services'
import { uploadPictureService } from '../../services/upload.services.js'

function CreateTeamForm(props) {
  const navigate = useNavigate()
  console.log("props",props)
  

  const [nameInput, setNameInput] = useState("")
  const [nameTagInput, setNameTagInput] = useState("")
  // const [pictureInput, setPictureInput] = useState()
  const [joinPasswordInput, setJoinPasswordInput] = useState("")
  const [pictureURL, setPictureUrl] = useState("")
  const [isLoadingPicture, setIsLoadingPicture] = useState(false)

  const [isFetching, setIsFetching] = useState(true)


  const handleNameChange = (e) => setNameInput(e.target.value)
  const handNameTagChange = (e) => setNameTagInput(e.target.value)
  const handleJoinPasswordChange = (e) => setJoinPasswordInput(e.target.value)

  
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const teamToCreate = {
      name: nameInput,
      nameTag: nameTagInput,
      picture: pictureURL,
      joinPassword: joinPasswordInput
      
    }
    
    try {
     
  
      await createTeamService(teamToCreate)

      setIsFetching(false)
      // navigate("/profile")
      props.updateTeamCreated()
      
      
    } catch (error) {
      navigate("/error")
      
    }
  }
  const handlePictureChange = async (e) => {
    setIsLoadingPicture(true)
    console.log("target file",e.target.files[0])

    // setPictureInput(e.target.value)
    
    const sendObj = new FormData()
    sendObj.append("picture",e.target.files[0])

    try {
      const response = await uploadPictureService(sendObj)
      console.log("response picture",response.data.picture)
      setPictureUrl(response.data.picture)
      setIsLoadingPicture(false)

    } catch (error) {
      console.log(error)
      
    }
  }
   
  if(isFetching === true){
    <h3>...Loading</h3>
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
          <Form.Control  onChange={handlePictureChange} type="file" name="picture"/>
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label htmlFor="joinPassword">JoinPassword: </Form.Label>
          <Form.Control value ={joinPasswordInput} onChange={handleJoinPasswordChange} type="text" placeholder="Password for user to join" />
        </Form.Group>
        {isLoadingPicture === true && <p>...loading picture</p>}

        {pictureURL !== "" ? <img src={pictureURL} alt="pict" width={200}/> : <p>Choose image</p>}
                
        
       
        <Button type="submit" onClick={handleSubmit}>Create your Team</Button>
      </fieldset>
    </Form>
                  


    </div>
  )
}
  

export default CreateTeamForm