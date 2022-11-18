
import { useEffect, useState } from "react"
import { addMemberTeamService, detailsTeamService } from "../services/team.services"
import { useNavigate, useParams } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";



function TeamDetails() {
  const {teamId} = useParams()

  const navigate = useNavigate()

  const [teamDetails, setTeamDetails] = useState()
  const [isFetching, setIsFetching] = useState(true)
  

  useEffect(() => {
    
    getData()
    
  }, [])
  
  const getData = async () => {
    try {
        const details = await detailsTeamService(teamId)
      
        setTeamDetails(details.data)
        setIsFetching(false)
    } catch (error) {
        navigate("/error")
    }
}
if (isFetching === true) {
  return (
      <h3>...Loading</h3>
      
  )
}

  const handleJoinTeam = async(e) => {
    setIsFetching(true)
    e.preventDefault()
    try {
     await addMemberTeamService(teamId)
    //  const details = await detailsTeamService(teamId)
      getData()
    //  setTeamDetails(details.data)
    

      // navigate(`/team/${teamId}/details`)
    } catch (error) {
      navigate("/error")
    }
  }
  return (
    <div>
        <h3>team details</h3>
        <Card  style={{ margin:"auto",width: '20rem', marginBotton: "20px", opacity:"0.7"}}>
      <Card.Img variant="top" src={teamDetails.picture} />
      <Card.Body>
        <Card.Title>{teamDetails.name}</Card.Title>
        <Card.Text>
          Members:
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
      {teamDetails.members.map((eachMember) => {
        return (
        <ListGroup.Item key={eachMember._id}>{TeamDetails.nameTag} - {eachMember.username}</ListGroup.Item>
        ); 
      })}
     </ListGroup>
     <Button type="submit" variant="outline-secondary" id="button-addon3" onClick={handleJoinTeam}>
        Join Team
        </Button>
    </Card>
     
       
     

{/* 
        <img src={teamDetails.picture} alt="shield" />
        <h3>{teamDetails.name}</h3>
        <ul>
        {teamDetails.members.map((eachMem)=> {
          return (
            <li key={eachMem._id}>{teamDetails.nameTag}-{eachMem.username}</li>
          )
        })}
        </ul> */}
      
    </div>
  )
}

export default TeamDetails





