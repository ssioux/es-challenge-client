import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {
  addTeamToTourneyService,
  detailsTourneyService,
  removeTeamFromTourneyService,
  sortTeamsToTourneyService,
} from "../../services/tourney.services";
import { findTeamCreatorService } from "../../services/team.services";

import { useEffect, useState } from "react";

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import Spinner from "react-bootstrap/Spinner";

function TourneyListTeams(props) {
  console.log(props.mainData);
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

      // EN DETAILS TIENEN TODA LA INFO DE LOS TIERS DEL TORNEO
      // NO HARIA FALTA ESTADOS PARA CADA UNO

      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <Spinner animation="border" variant="light" />;
  }

  // Find the team of the current user inscribed in the tourney
  const findOwnTeamTourney = details?.teams?.filter(
    (each) => each._id === ownTeam?._id
  );

  // ******* Sort teams to start the tourney and update quarter finals
  const handleStartSort = async (e) => {
    e.preventDefault();
    try {
      const response = await sortTeamsToTourneyService(tourneyId);

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
    <div>
      {/* START BUTTON => Iniciates the short of the teams only by the Admin, when tourney is active disapear */}
      {details.quarterA.length === 0 && user?.user.role === "admin" && (
        <Button
          id="button-addon3"
          variant="outline-secondary"
          onClick={handleStartSort}
        >
          Start
        </Button>
      )}
      {/* REGISTER TEAM BUTTON => Register your team in the tourney. Non register users don´t see the button  */}
      {isLoggedIn === true &&
        details.teams?.filter((each) => each._id === ownTeam?._id).length ===
          0 && (
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

      {isLoggedIn === true && findOwnTeamTourney[0]?._id === ownTeam?._id && (
        <Button
          variant="outline-secondary"
          id="button-addon3"
          onClick={handleRemoveTeamFromTourney}
        >
          Remove Team
        </Button>
      )}

      {errorMessage !== "" && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}

export default TourneyListTeams;
