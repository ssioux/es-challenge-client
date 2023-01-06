import { useParams, useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Carousel from 'react-multi-carousel';



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
import { ListGroup } from "react-bootstrap";

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
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
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
          return(
            <Card
              key={eachTeam._id}
              style={{ width: "12rem", marginBotton: "20px", opacity: "0.7" }}
            >
              <Card.Img variant="top" src={eachTeam.picture} />
              <Card.Body>
                <Card.Title>{eachTeam.name}</Card.Title>
                <Card.Text>Members:</Card.Text>
              </Card.Body>

              <ListGroup className="list-group-flush">
                {eachTeam.members.map((eachMember) => {
                  return (
                    <ListGroup.Item key={eachMember._id}>
                      {eachTeam.nameTag} - {eachMember.username}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
              <Card.Body>
                <Link to={`/team/${eachTeam._id}/details`}>Team Details</Link>
                {/* <Card.Link href="#">Another Link</Card.Link> */}
              </Card.Body>
            </Card>
          )
        })}
      </div>
      
    </div>
  );
}

export default TourneyListTeams;
