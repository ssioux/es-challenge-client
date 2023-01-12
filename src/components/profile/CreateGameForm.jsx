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
    <div id="create-game-container">
        
<div className="create-team-container">>
           <form>
<h3>Create New Game</h3>

          <div className="input-container">
          <input value ={nameInput} onChange={handleNameChange}  />
<label className={nameInput && "filled"} htmlFor="name">Name</label>
</div>
<div className="input-container">
          <input value ={descriptionInput} onChange={handDescriptionChange}  />
 <label className={descriptionInput && "filled"} htmlFor="description">Description</label>
        </div>
        <div className="uploader-pic">
          <input onChange={handlePictureChange} type="file" name="picture" />
       <label htmlFor="picture">Picture</label>
          </div>
                
        
        {isLoadingPicture === true && <p>...loading picture</p>}
{pictureURL !== "" ? <img src={pictureURL} alt="pict" className="uploader-img"  /> : <p> [ No Picture Selected ]</p>}
        
        <button type="submit" onClick={handleSubmit}>Create Game</button>
     
    </form>
                  
</div>

    </div>
  )
}

export default CreateGameForm