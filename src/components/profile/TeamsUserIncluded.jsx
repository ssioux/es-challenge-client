// React Hooks
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// Axios Services
import { findTeamUserService } from "../../services/team.services";

function TeamsUserIncluded() {
  const navigate = useNavigate();
  const [userTeamList, setUserTeamList] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      // Find the Current User Team
      const response = await findTeamUserService();
      // Send Team Data to the State
      setUserTeamList(response.data);
      // Loading Finished
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>... buscando</h3>;
  }

  return (
    <div id="team-included-container">
      <div className="team-included-container">
      <div>
        <h3>Your Teams</h3>
      </div>
        
       <div>
         {userTeamList.map((eachTeam) => {
          return ( userTeamList.lenght === 0 ? (
            <h4>You aren't regiestered in any team</h4>
          ) : (
            <Link to={`/team/${eachTeam._id}/details`} key={eachTeam._id}>
              <div className="team-included-card">
                <div className="team-included-card-box1">
                  <img
                    src={eachTeam.picture}
                    alt="team-pic"
                    className="team-flag"
                  />
                </div>

                <div className="team-included-card-box2">{eachTeam.name}</div>
              </div>
            </Link>
          ));
        })}
       </div>
       
      </div>
    </div>
  );
}

export default TeamsUserIncluded;
