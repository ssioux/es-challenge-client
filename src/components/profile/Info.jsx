
// React Hooks
import { useNavigate} from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { AuthContext } from "../../context/auth.context.js";
// Components
import InfoEdit from "./InfoEdit";
import CreateTourneyForm from "./CreateTourneyForm";
import CreateTeamForm from "./CreateTeamForm";
import TeamsUserIncluded from "./TeamsUserIncluded";
import CreateGameForm from "./CreateGameForm";
// Axios Services
import { findTeamCreatorService } from "../../services/team.services";




function Info() {
  const navigate = useNavigate();

  const [isFetching, setIsFetching] = useState(true);

  // State to show or destroy Collapse
  const [btnCreateTeam, setBtnCreateTeam] = useState(true);
  const [ownTeam, setOwnTeam] = useState();

  const { user } = useContext(AuthContext);
  const { username, email, _id, picture } = user.user;

  // States to components
  const [createTeam, setCreateTeam] = useState(false);
  const [yourTeam, setYourTeam] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [createTourney, setCreateTourney] = useState(false);
  const [teamsYouAreIncluded, setTeamsYouAreIncluded] = useState(false);
  const [createGame, setCreateGame] = useState(false);

  // Search the team created for the current user
  useEffect(() => {
    getData();
  }, [ownTeam?._id]);

  const getData = async () => {
    try {
      const response = await findTeamCreatorService();

      const findTeamCreator = response.data;
      if (findTeamCreator === null) {
        // Activates the button Create Team & desabled the buttonshow Your Team
        setBtnCreateTeam(true);
        setOwnTeam(null);
      } else {
        // Activates Show Your Team & desabled Create Team Button
        setBtnCreateTeam(false);
        setOwnTeam(findTeamCreator);
      }
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };
// Loading is finished
  if (isFetching === true) {
    return <h3>...Loading</h3>;
  }

  // Toogle components
  const createTeamForm = () => {
    setCreateGame(false);
    setTeamsYouAreIncluded(false);
    setCreateTourney(false);
    setYourTeam(false);
    setEditUser(false);
    setCreateTeam(true);
  };
  const handleYourTeam = () => {
    setCreateGame(false);
    setTeamsYouAreIncluded(false);
    setCreateTourney(false);
    setCreateTeam(false);
    setEditUser(false);
    setYourTeam(true);
  };
  const handleEditUser = () => {
    setCreateGame(false);
    setTeamsYouAreIncluded(false);
    setCreateTourney(false);
    setYourTeam(false);
    setCreateTeam(false);
    setEditUser(true);
  };
  const handleCreateTourney = () => {
    setCreateGame(false);
    setTeamsYouAreIncluded(false);
    setYourTeam(false);
    setCreateTeam(false);
    setEditUser(false);
    setCreateTourney(true);
  };
  const handleteamsYouAreIncluded = () => {
    setCreateGame(false);
    setYourTeam(false);
    setCreateTeam(false);
    setEditUser(false);
    setCreateTourney(false);
    setTeamsYouAreIncluded(true);
  };
  const handleCreateGame = () => {
    setCreateGame(false);
    setYourTeam(false);
    setCreateTeam(false);
    setEditUser(false);
    setCreateTourney(false);
    setTeamsYouAreIncluded(false);
    setCreateGame(true);
  };

  return (
    <div className="info-container">

      <section className="info-user">

        <div className="box-user">
          <div className="image-user">
            <img src={picture} alt="imag-user" />
          </div>

          <div>
            <h2>{username}</h2>
          </div>
        </div>

        <div className="box-buttons">
          <div className="button-group">
            <div>
              <button onClick={handleEditUser}>Edit User</button>
            </div>
            <div>
              {btnCreateTeam ? (
                <button onClick={createTeamForm}>Create Team</button>
              ) : (
                <button disabled>-</button>
              )}
            </div>
            <div>
              <button onClick={handleCreateGame}>Create Game</button>
            </div>
          </div>
          <div className="button-group">
            <div>
              <button onClick={handleCreateTourney}>Create Tourney</button>
            </div>
            <div>
              {btnCreateTeam ? (
                <button disabled> - </button>
              ) : (
                <button onClick={handleYourTeam}>Own Team</button>
              )}
            </div>
            <div>
              <button onClick={handleteamsYouAreIncluded}>Your Teams</button>
            </div>
          </div>
        </div>
      </section>

      <section id="profile-components">
        {createTeam && (
          <CreateTeamForm
            setCreateTeam={setCreateTeam}
            setYourTeam={setYourTeam}
            updateTeamCreated={getData}
          />
        )}

        {/* ownTeam Component */}
        {yourTeam && (
          <div className="your-team">
            <div id="own-team-box">
            <img src={ownTeam?.picture} alt="team-pic" />
            <h2> <b> {ownTeam?.name}</b></h2>
            </div>
            <h4>
              Members:{" "}
              {ownTeam?.members.map((eachMem) => {
                return (
                  <p key={eachMem._id}> <i>
                    {eachMem.username}</i></p>
                  
                );
              })}
            </h4>
          </div>
        )}
        {editUser && <InfoEdit id={_id} updateUser={getData} />}
        {createTourney && <CreateTourneyForm />}
        {teamsYouAreIncluded && <TeamsUserIncluded />}
        {createGame && <CreateGameForm />}
      </section>
    </div>
  );
}

export default Info;
