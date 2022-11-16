import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {listTourneysService} from "../../services/tourney.services.js"
// import CreateTourneyForm from "../profile/CreateTourneyForm.jsx"

function TourneyList() {
  const navigate = useNavigate()
  // create state to store the data
  const [list, setList] = useState([])
  const [isFetching, setIsFetching ] = useState(true)

  useEffect(() => {
    getData()

  },[])
  const getData = async () => {
    try {
      const response = await listTourneysService() 
      
      console.log("responseList",response)
      
      setList(response.data)
      
      setIsFetching(false)
    

    } catch (error) {
      navigate("/error");
      
    }
  }

  
   if(isFetching === true) {
    return <h3>Loading . . .</h3>
   }
    
  return (
    <div>
          {/* <CreateTourneyForm updateList={getData}/> PREGUNTA*/}

        <h3>TourneyList</h3>
        {list.map((eachTourney) => {
          console.log(eachTourney)
          return(
            <div key={eachTourney._id}>
            <h4 >
              <Link to={`/list/${eachTourney._id}/details`}>{eachTourney.name}</Link>
            </h4>
            <p>{eachTourney.game.name}</p>
            <p>by: {eachTourney.creator.username}</p>
            <p>Teams: {eachTourney.teams.length}/8</p>
            </div>

          )
        })}
    </div> 
      
            
            
            
          
  )
}

export default TourneyList