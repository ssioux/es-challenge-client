
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
  

  const [listGames , setListGames] = useState([])

  const handleNameChange = (e) => setNameInput(e.target.value)
  const handleGameChange = (e) => setGameInput(e.target.value)
   
     useEffect(() =>{
     getData()
    },[])

  const getData = async () => {
    

     try {
    const responseGames = await listGamesService()
    setListGames(responseGames.data)
     console.log("responseGames",responseGames.data)
     console.log("nameGame",responseGames.data)
  } catch (error) {
    console.log(error)
  } 
  }
   
 
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const newTourney = {
      name: nameInput,
      game: gameInput,
    }
     try {
       // contact to server to create the Tourney and give us the response
        await createTourneyService(newTourney)
       
        // update List of Turneys
        // props.updateList()
        navigate("/")
      
     } catch (error) {
      console.log(error)
      
     }

     
  }
  return (
    <div style={{display:"flex",
      justifyContent:"center",
     alignItems:"center"}} >
           <Form style={{display:"flex"}}>
      <fieldset >
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="Name">Name</Form.Label>
          <Form.Control value ={nameInput} onChange={handleNameChange} id="disabledTextInput" placeholder="Name of Tourney" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="Game">Choose your Game</Form.Label>
                      {/* <Form.Control  as="select"  onChange={handleGameChange}>
                       {listGames.map(opt => (
                       <option key={opt._id} value={opt._id}>{opt.name}</option>
                       ))}
                      </Form.Control>
                    */}
                    <Form.Select onChange={handleGameChange}>
                    {listGames.map(opt => (
                       <option key={opt._id} value={opt._id}>{opt.name}</option>
                       ))}
        </Form.Select>
        
        </Form.Group>
       
        <Button type="submit" onClick={handleSubmit}>Create Tourney</Button>
      </fieldset>
    </Form>
                  


    </div>
  )
}

export default CreateTourneyForm