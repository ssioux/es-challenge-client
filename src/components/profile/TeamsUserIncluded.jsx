import {useEffect, useState} from "react"
import { useNavigate, Link } from "react-router-dom"
import { findTeamUserService } from "../../services/team.services"


function TeamsUserIncluded() {

  const navigate = useNavigate()
  const [userTeamList, setUserTeamList] = useState(null)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    
    getData()
   
  }, [])
  
 
  const getData = async () =>  {

      try {
        const response = await findTeamUserService()
        console.log(response)
        setUserTeamList(response.data)
        setIsFetching(false)
      } catch (error) {
       navigate("/error")
      }

  }

  if (isFetching === true) {
    return (
      <h3>... buscando</h3>
    )
  }


  return (
    <div>
      <h3>Teams You are included</h3>


      {userTeamList.map((eachTeam)=> {
        return (
          <div key={eachTeam._id}>
          <Link to={`/team/${eachTeam._id}/details`}>{eachTeam.name}</Link>
          </div>
        )
      })}
    </div>
  );
}

export default TeamsUserIncluded;
