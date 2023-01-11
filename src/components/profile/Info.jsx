import axios from "axios";
import { detailsUser, updateUser } from "../../services/profile.services";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context.js";
import InfoEdit from "./InfoEdit";
import CreateTourneyForm from "./CreateTourneyForm"
import Button from "react-bootstrap/Button";
import CreateTeamForm from "./CreateTeamForm";
import Collapse from "react-bootstrap/Collapse";
import { findTeamCreatorService } from "../../services/team.services";
import TeamList from "../../pages/navbar/TeamList";
import TeamsUserIncluded from "./TeamsUserIncluded";
import CreateGameForm from "./CreateGameForm"
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function Info() {
  const navigate = useNavigate();
  const [formIsShowing, setFormIsShowing] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // State to show or destroy Collapse
  const [viewCreateTeam, setViewCreateTeam] = useState(true);
  const [ownTeam, setOwnTeam] = useState();

  const { user } = useContext(AuthContext);
  const { username, email, _id, picture } = user.user;

  // States to components
  const [createTeam, setCreateTeam] = useState(false);
  const [yourTeam, setYourTeam] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [createTourney, setCreateTourney] = useState(false);
  const [teamsYouAreIncluded, setTeamsYouAreIncluded] = useState(false)
  const [createGame, setCreateGame] = useState(false)

  // GET BUSCAR EQUIPO
  useEffect(() => {
    getData();
  }, [ownTeam?._id]);

  const getData = async () => {
    try {
      const response = await findTeamCreatorService();

      const findTeamCreator = response.data;
      if (findTeamCreator === null) {
        setViewCreateTeam(true);
        setOwnTeam(null);
      } else {
        setViewCreateTeam(false);
        setOwnTeam(findTeamCreator);
      }
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>...Loading</h3>;
  }
  

 // Toogle components
  const createTeamForm = () => {
    setCreateGame(false)
    setTeamsYouAreIncluded(false)
    setCreateTourney(false);
    setYourTeam(false);
    setEditUser(false);
    setCreateTeam(true);
  };
  const handleYourTeam = () => {
    setCreateGame(false)
    setTeamsYouAreIncluded(false)
    setCreateTourney(false);
    setCreateTeam(false);
    setEditUser(false);
    setYourTeam(true);
  };
  const handleEditUser = () => {
    setCreateGame(false)
    setTeamsYouAreIncluded(false)
    setCreateTourney(false);
    setYourTeam(false);
    setCreateTeam(false);
    setEditUser(true);
  };
  const handleCreateTourney = () => {
    setCreateGame(false)
    setTeamsYouAreIncluded(false)
    setYourTeam(false);
    setCreateTeam(false);
    setEditUser(false);
    setCreateTourney(true);
  };
  const handleteamsYouAreIncluded = () => {
    setCreateGame(false)
    setYourTeam(false);
    setCreateTeam(false);
    setEditUser(false);
    setCreateTourney(false);
    setTeamsYouAreIncluded(true)
  };
  const handleCreateGame = () => {
    setCreateGame(false)
    setYourTeam(false);
    setCreateTeam(false);
    setEditUser(false);
    setCreateTourney(false);
    setTeamsYouAreIncluded(false)
    setCreateGame(true)
  };

  return (
    <div className="info-container">
      <div className="info-user">
        <div className="image-user">
          <img src={picture} alt="imag-user" />
        </div>

        <div className="data-user">
          <div className="personal-info">
            <div>
              <h2>{username}</h2>
            </div>
            <div>
              <h4>{email}</h4>
            </div>
            {viewCreateTeam === true ? (
              <div>
                <button variant="outline-info">Create Team</button>
                <Collapse in={formIsShowing}>
                  <div>
                    <CreateTeamForm updateTeamCreated={getData} />
                  </div>
                </Collapse>
              </div>
            ) : (
              <div>
                <p>Your Team: {ownTeam.name}</p>
                <p>
                  Members:{" "}
                  {ownTeam.members.map((eachMem) => {
                    return (
                      <div key={eachMem._id}>
                        <p>{eachMem.username}</p>
                      </div>
                    );
                  })}
                </p>
              </div>
            )}
          </div>

          <div className="buttons-user">
            <div className="button-group">
              <div>
                <Button onClick={handleEditUser}>Edit User</Button>
              </div>
              <div>
               
                  <Button onClick={createTeamForm}>Create Team</Button>
                
              </div>
              <div>
                
                  <Button onClick={handleCreateGame}>Create Game</Button>
                
              </div>
            </div>
            <div className="button-group">
              <div>
                
                  <Button onClick={handleCreateTourney}>Create Tourney</Button>
               
              </div>
              <div>
                <Button onClick={handleYourTeam}>Your Team</Button>
              </div>
              <div>
                
                  <Button onClick={handleteamsYouAreIncluded}>Teams You are included</Button>
               
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-components">
        {createTeam && (
          <CreateTeamForm
            setCreateTeam={setCreateTeam}
            setYourTeam={setYourTeam}
            updateTeamCreated={getData}
          />
        )}

        {yourTeam && (
          <div className="your-team">
            <img src={ownTeam.picture} alt="" />
            <h2> {ownTeam.name}</h2>
            <p>
              Members:{" "}
              {ownTeam.members.map((eachMem) => {
                return (
                  <div key={eachMem._id}>
                    <p>{eachMem.username}</p>
                  </div>
                );
              })}
            </p>
          </div>
        )}
        {editUser && <InfoEdit id={_id} updateUser={getData} />}
        {createTourney && <CreateTourneyForm/>}
        {teamsYouAreIncluded && <TeamsUserIncluded/>}
        {createGame && <CreateGameForm/>}
      </div>
    </div>
  );
}

export default Info;
