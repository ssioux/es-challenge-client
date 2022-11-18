import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {listTourneysService} from "../../services/tourney.services.js"
import Card from 'react-bootstrap/Card';
// import CreateTourneyForm from "../profile/CreateTourneyForm.jsx"

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";






function TourneyList() {
  const { isLoggedIn } = useContext(AuthContext);
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


    <div width="20%" >
          

        <h3>TourneyList</h3>
        {list.map((eachTourney) => {
          
      return(




         
         <Card style={{ height: "12rem" ,width: '40rem', margin:"auto", opacity: "0.6"}}>
         <div style={{display:"flex"}}>
          <div width="20rem">
             <Card.Img  src={eachTourney.game.picture} style={{width: "60%", marginTop: "25px"}}/>
          </div>
          <div>
             <Card.Body style={{width:"400px"}}>
              {isLoggedIn === true ? <Card.Title><Link to={`/list/${eachTourney._id}/details`}>{eachTourney.name}</Link></Card.Title> 
              : <Card.Title><Link  to="/signup">{eachTourney.name}</Link></Card.Title>}
              <Card.Text>Game:{eachTourney.game.name}</Card.Text>
              <Card.Text>teams:{eachTourney.teams.length}/8</Card.Text>
              <Card.Text>Description:{eachTourney.description}</Card.Text>
             </Card.Body>
          </div>
         </div>
         </Card>
             )
               
         })}

    </div>

)
}
              









export default TourneyList

{/* <div style={{display:"flex", width:"30%", margin:"auto", justifyContent:"space-between", gap:"30px"}}>


<div key={eachTourney._id} >
  <img src={eachTourney.game.picture} alt="pict" width={200}/>
</div>
<div >
  <h4 >
 <Link to={`/list/${eachTourney._id}/details`}>{eachTourney.name}</Link>
 </h4>
 <p>{eachTourney.game.name}</p>
 <p>by: {eachTourney.creator.username}</p>
  <p>{eachTourney.game.name}</p>
</div>
</div> */}










      
            
            
            
          


  