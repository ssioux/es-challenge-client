// React Hooks
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
// Bootstrap components

import Spinner from "react-bootstrap/Spinner";

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
          <div className="game-img">
            <img src={details.game.picture} alt="gamePicture" />
          </div>
          <div className="game-name">
            <h3>{details.game.name}</h3>
          </div>
        </div>
        <div className="tourney-list-tourney-name">
          <h1>{details.name}</h1>
        </div>
        <div className="tourney-team-list-options">
          <div className="tourney-team-list-options-text">
            <h3>OPTIONS:</h3>
          </div>
          <div className="tourney-team-list-options-buttons">
            {/* START BUTTON => Iniciates the short of the teams only by the Admin, when tourney is active disapear */}
            {details.quarterA.length === 0 &&
            details.teams.length === 8 &&
            (user?.user.role === "admin" ||
              user?.user._id === details?.creator) ? (
              <div className="options-buttons">
                <button
                  id="button-addon3"
                  variant="outline-secondary"
                  onClick={handleStartSort}
                >
                  Start
                </button>
              </div>
            ) : (
              <div className="options-buttons">
                <button
                  disabled={true}
                  id="button-addon3"
                  variant="outline-secondary"
                  onClick={handleStartSort}
                >
                  Start
                </button>
              </div>
            )}
            {/* REGISTER TEAM BUTTON => Register your team in the tourney. Non register users don´t see the button  */}
            {isLoggedIn === true &&
            details.teams?.filter((each) => each._id === ownTeam?._id)
              .length === 0 ? (
              <div className="options-buttons">
                <button
                  disabled={false}
                  variant="outline-secondary"
                  id="button-addon3"
                  onClick={handleAddTeamToTourney}
                >
                  Register Team
                </button>
              </div>
            ) : (
              <div className="options-buttons">
                <button
                  disabled={true}
                  variant="outline-secondary"
                  id="button-addon3"
                  onClick={handleAddTeamToTourney}
                >
                  Register Team
                </button>
              </div>
            )}
            {/* REMOVE TEAM BUTTON => Remove your team from the tourney. User hasn´t team registered in the tourney, he can´t see the button */}

            {isLoggedIn === true &&
            findOwnTeamTourney[0]?._id === ownTeam?._id ? (
              <div className="options-buttons">
                <button
                  variant="outline-secondary"
                  id="button-addon3"
                  onClick={handleRemoveTeamFromTourney}
                >
                  Remove Team
                </button>
              </div>
            ) : (
              <div className="options-buttons">
                <button
                  disabled={true}
                  variant="outline-secondary"
                  id="button-addon3"
                  onClick={handleRemoveTeamFromTourney}
                >
                  Remove Team
                </button>
              </div>
            )}
          </div>

          {errorMessage !== "" && (
            <p style={{ color: "red" }}>{errorMessage}</p>
          )}
        </div>
      </div>
      <div className="tourney-list-team-container">
        {details.teams.map((eachTeam) => {
          return (
            <div className="team-card" key={eachTeam._id}>
              <Link to={`/team/${eachTeam._id}/details`}>
                <div className="image-card">
                  <img src={eachTeam.picture} alt="shield" />
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
