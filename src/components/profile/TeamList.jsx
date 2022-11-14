
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { listTeamsService } from "../../services/team.services"


function TeamList() {

    const navigate = useNavigate()
    const [teamList, setTeamList] = useState()
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
      
        getData()
      
    }, [])
    
    const getData = async () => {
        try {
            const allTeams = await listTeamsService()
            setTeamList(allTeams.data)
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

  return (
    <div>
        <h3>TeamList</h3>
        {teamList.map((eachTeam)=> {
            return(
            <div key={eachTeam._id}>
            <p >
            <Link to={`/team/${eachTeam._id}/details`}>{eachTeam.name}</Link>
            </p>
            </div>
            )
            
        })}

    </div>
  )
}

export default TeamList