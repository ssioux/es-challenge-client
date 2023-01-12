// React Hooks
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
// Bootstrap components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { ListGroup } from "react-bootstrap";
// Axios Services for API Rest
import {
  addTeamToTourneyService,
  detailsTourneyService,
  removeTeamFromTourneyService,
  sortTeamsToTourneyService,
} from "../../services/tourney.services";
import { findTeamCreatorService } from "../../services/team.services";

function TourneyListTeams(props) {
  // Hooks
  const { isLoggedIn, user } = useContext(AuthContext);
  const { tourneyId } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [ownTeam, setOwnTeam] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  // Axios Data
  const getData = async () => {
    try {
      // ******** Find Team Creator from Api
      if (isLoggedIn === true) {
        const responseOwnTeam = await findTeamCreatorService();
        setOwnTeam(responseOwnTeam.data);
      }

      // ******** Tourney Details from Api
      const response = await detailsTourneyService(tourneyId);

      const tourneyDetails = response.data;

      setDetails(tourneyDetails);

      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <Spinner animation="border" variant="light" />;
  }

  // ********************  FUNCTIONS ***************
  // Find the team of the current user inscribed in the tourney
  const findOwnTeamTourney = details?.teams?.filter(
    (each) => each._id === ownTeam?._id
  );

  // ******* Sort teams to start the tourney and update quarter finals
  const handleStartSort = async (e) => {
    e.preventDefault();
    try {
      const response = await sortTeamsToTourneyService(tourneyId);
      // Reload Data from Main to change to the Tourneybracket Component
      props.mainData();

      navigate(`/list/${tourneyId}/details`);
    } catch (error) {
      navigate("/error");
    }
  };

  // ********* Add team to Tourney
  const handleAddTeamToTourney = async (e) => {
    e.preventDefault();

    try {
      await addTeamToTourneyService(tourneyId);

      getData();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.errorMessage);
      }
    }
  };
  // ******* Remove team from Tourney
  const handleRemoveTeamFromTourney = async (e) => {
    e.preventDefault();

    try {
      await removeTeamFromTourneyService(tourneyId);

      getData();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.errorMessage);
      }
    }
  };

  return (
    <div className="tourney-list-teams">
      <div className="tourney-list-teams-header">
        <div className="game-tourney-list">
          <img src={details.game.picture} alt="gamePicture" />
          <h2>{details.game.name}</h2>
        </div>
        <div className="tourney-list-tourney-name">
          <h1>{details.name}</h1>
        </div>
        <div className="buttons">
          {/* START BUTTON => Iniciates the short of the teams only by the Admin, when tourney is active disapear */}
          {details.quarterA.length === 0 && user?.user.role === "admin" && (
            <div className="start-tourney-btn">
              <p>Press Start to begins the tourney</p>
              <Button
                id="button-addon3"
                variant="outline-secondary"
                onClick={handleStartSort}
              >
                Start
              </Button>
            </div>
          )}
          {/* REGISTER TEAM BUTTON => Register your team in the tourney. Non register users don´t see the button  */}
          {isLoggedIn === true &&
            details.teams?.filter((each) => each._id === ownTeam?._id)
              .length === 0 && (
              <Button
                disabled={false}
                variant="outline-secondary"
                id="button-addon3"
                onClick={handleAddTeamToTourney}
              >
                Register Team
              </Button>
            )}
          {/* REMOVE TEAM BUTTON => Remove your team from the tourney. User hasn´t team registered in the tourney, he can´t see the button */}

          {isLoggedIn === true &&
            findOwnTeamTourney[0]?._id === ownTeam?._id && (
              <div className="add-team-btn">
                <p>
                  If you want remove your team from the tourney press Remove
                  team button
                </p>
                <Button
                  variant="outline-secondary"
                  id="button-addon3"
                  onClick={handleRemoveTeamFromTourney}
                >
                  Remove Team
                </Button>
              </div>
            )}

          {errorMessage !== "" && (
            <p style={{ color: "red" }}>{errorMessage}</p>
          )}
        </div>
      </div>
      <div className="tourney-list-team-list">
        {details.teams.map((eachTeam) => {
          return (
            <div className="team-card">
              <Link to={`/team/${eachTeam._id}/details`}>
                <div className="image-card" key={eachTeam._id}>
                  <img src={eachTeam.picture} alt="" />
                </div>
                <div className="name-team">
                  <h3>{eachTeam.name}</h3>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TourneyListTeams;
