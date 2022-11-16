
import axios from "axios"
import { detailsUser, updateUser } from "../../services/profile.services"
import {  useNavigate, Link } from "react-router-dom"
import { useEffect, useState  } from 'react'
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context.js";
import InfoEdit from "./InfoEdit";
import Button from "react-bootstrap/Button"
import CreateTeamForm from "./CreateTeamForm";
import  Collapse  from "react-bootstrap/Collapse";
import { findTeamCreatorService } from "../../services/team.services";
import TeamList from "./TeamList";



function Info () {
  const navigate = useNavigate()
  const [formIsShowing, setFormIsShowing] = useState(false)
  const [isFetching, setIsFetching] = useState(true)

  // State to show or destroy Collapse
  const [viewCreateTeam, setViewCreateTeam] = useState(true)
  const [ownTeam, setOwnTeam] = useState()
  

  const { user } = useContext(AuthContext);
  const{username, email, _id, picture} = user.user
console.log("user",user )

// GET BUSCAR EQUIPO
useEffect(()=> {
getData()

},[])

const getData = async() => {
  try {
    const response = await findTeamCreatorService()
   
   const findTeamCreator = response.data
    if(findTeamCreator === null){
            setViewCreateTeam(true)
            setOwnTeam(null)
    }else{
     
        setViewCreateTeam(false)
       setOwnTeam(findTeamCreator)
    }
       setIsFetching(false)
  } catch (error) {
    navigate("/error")
    
  }

  
}

if(isFetching === true) {
  return (
    <h3>...Loading</h3> 
  )
}
  // SI EL CREADOR COINCIDE CON EL CREADOR DE ALGÚN EQUIPO
   // SI COINCIDE, MENSAJE DE ERROR
     // SI NO COINCIDE CREAR EQUIPO


   const toggleForm = () => {
    if(formIsShowing === true) {
      setFormIsShowing(false)
    }else{
      setFormIsShowing(true)
    }
   }
  

  return (
    <div style={{display:"flex", flexDirection:"column"}}>
        <div>
          <h3>Hello {username}</h3>
          <img src={picture} alt="imageProfile" width={100} />
          <h4>email: {email}</h4>
        </div>

        {viewCreateTeam === true ? (
        <div>
           <Button variant="outline-info" onClick={toggleForm}>Create Team</Button>
           <Collapse in={formIsShowing}>
           <div>
        
             <CreateTeamForm/>
          
           </div>
           </Collapse>
        </div> 

        ) : ( 

          <div>
            <p>Your team: {ownTeam.name}</p>
            <p>Members: {ownTeam.members.map((eachMem) => {
              return <p key={eachMem._id}>{eachMem.username}</p>
            })}</p>
          </div>
          )}

        <div style={{display:"flex", flexDirection:"column"}}>
          <Link to={`/profile/${_id}/edit`} >Edit User</Link>
          {/* <Link to="/team/create" >Create Team</Link> */}
          <Link to="/tourney/create" >Create Tourney</Link>  {/* admin */}
          <Link to="/game/create" >Create Game</Link>  {/* admin */}
        </div>


        <div>

        <TeamList/>
        </div>
           

    </div>
  )
}
        



           
        




export default Info
