
import {useState, useContext, useEffect} from "react"
import {createTourneyService} from "../../services/tourney.services"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { listGamesService } from "../../services/game.services"
import { useNavigate } from "react-router-dom"

// !no olvidar actualizar la lista al añadir un nuevo torneo


function CreateTourneyForm(props) {
  const navigate = useNavigate()
  const [nameInput, setNameInput] = useState("")
  const [gameInput, setGameInput] = useState()
  const [descriptionInput, setDescriptionInput] = useState()
  

  const [listGames , setListGames] = useState([])

  const handleNameChange = (e) => setNameInput(e.target.value)
  const handleGameChange = (e) => setGameInput(e.target.value)
  const handleDescriptionChange = (e) => setDescriptionInput(e.target.value)
   
     useEffect(() =>{
     getData()
    },[])

  const getData = async () => {
    

     try {
    const responseGames = await listGamesService()
    setListGames(responseGames.data)
   
  } catch (error) {
    navigate("/error")
  } 
  }
   
 
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const newTourney = {
      name: nameInput,
      game: gameInput,
      description:descriptionInput
    }
     try {
       // contact to server to create the Tourney and give us the response
        await createTourneyService(newTourney)
       
        // update List of Turneys
        // props.updateList()
        navigate("/")
      
     } catch (error) {
      navigate("/error")
      
     }

     
  }
  return (
    <div id="create-tourney-container">
      <div className="create-team-container">
           <form >
           <h3>Create a  Tourney</h3>
        <div className="input-container">
          
          <input value ={nameInput} onChange={handleNameChange} />
      <label className={nameInput && "filled"} htmlFor="Name">Name</label>
       </div>
<div className="input-container">
          
          <input value ={descriptionInput} onChange={handleDescriptionChange} />
    <label className={descriptionInput && "filled"} htmlFor="description">Description</label>
     </div>
       
       <div className="select-option">
          <label htmlFor="Game">Choose your Game</label>
                    
                    <select onChange={handleGameChange}>
                    {listGames.map(opt => (
                       <option key={opt._id} value={opt._id}>{opt.name}</option>
                       ))}
        </select>
        </div>
     
       
    
        <button type="submit" onClick={handleSubmit} >Create Tourney</button>
     
    </form>
                  
</div>

    </div>
  )
}

export default CreateTourneyForm