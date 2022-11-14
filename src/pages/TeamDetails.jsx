
import { useEffect, useState } from "react"
import { addMemberTeamService, detailsTeamService } from "../services/team.services"
import { useNavigate, useParams } from "react-router-dom"
import Button from "react-bootstrap/Button"

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
    e.preventDefault()
    try {
     await addMemberTeamService(teamId)
      navigate(`/team/${teamId}/details`)
    } catch (error) {
      navigate("/error")
    }
  }
  return (
    <div>
        <h3>team details</h3>

        <img src={teamDetails.picture} alt="shield" />
        <h3>{teamDetails.name}</h3>
        <ul>
        {teamDetails.members.map((eachMem)=> {
          return (
            <li key={eachMem._id}>{teamDetails.nameTag}-{eachMem.username}</li>
          )
        })}
        </ul>
        <Button onClick={handleJoinTeam}>Join team</Button>
    </div>
  )
}

export default TeamDetails