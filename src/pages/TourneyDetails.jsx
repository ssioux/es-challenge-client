import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {
  addTeamToTourneyService,
  detailsTourneyService,
  sortTeamsToTourneyService,
} from "../services/tourney.services";
import { useEffect, useState } from "react";

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Spinner from 'react-bootstrap/Spinner';

function TourneyDetails() {
  const { isLoggedIn, user } = useContext(AuthContext);
  console.log("🚀 ~ authContex ~ user", user);

  const navigate = useNavigate();
  const { tourneyId } = useParams();
  const [details, setDetails] = useState();

  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // ! QUARTER STATES
  // * Quarter A
  const [quarterA1, setQuarterA1] = useState("");
  const [scoreQA1, setScoreQA1] = useState("0");

  const [quarterA2, setQuarterA2] = useState("");
  const [scoreQA2, setScoreQA2] = useState("0");

  // * Quarter B
  const [quarterB1, setQuarterB1] = useState("");
  const [scoreQB1, setScoreQB1] = useState("0");

  const [quarterB2, setQuarterB2] = useState("");
  const [scoreQB2, setScoreQB2] = useState("0");
  // * Quarter C
  const [quarterC1, setQuarterC1] = useState("");
  const [scoreQC1, setScoreQC1] = useState("0");

  const [quarterC2, setQuarterC2] = useState("");
  const [scoreQC2, setScoreQC2] = useState("0");

  // * Quarter D
  const [quarterD1, setQuarterD1] = useState("");
  const [scoreQD1, setScoreQD1] = useState("0");

  const [quarterD2, setQuarterD2] = useState("");
  const [scoreQD2, setScoreQD2] = useState("0");

  // * Semi A
  const [semiA1, setSemiA1] = useState("");
  const [scoreSA1, setScoreSA1] = useState("0");

  const [semiA2, setSemiA2] = useState("");
  const [scoreSA2, setScoreSA2] = useState("0");

  // * Semi B
  const [semiB1, setSemiB1] = useState("");
  const [scoreSB1, setScoreSB1] = useState("0");

  const [semiB2, setSemiB2] = useState("");
  const [scoreSB2, setScoreSB2] = useState("0");

  // * Final
  const [final1, setFinal1] = useState("");
  const [scoreF1, setScoreF1] = useState("0");

  const [final2, setFinal2] = useState("");
  const [scoreF2, setScoreF2] = useState("0");

  // * Winner
  const [winner, setWinner] = useState("");

  useEffect(() => {
    getData();

  }, []);

  const getData = async () => {
    try {
      const response = await detailsTourneyService(tourneyId);

      const tourneyDetails = response.data;
      console.log("tourneyDetails", tourneyDetails);
      setDetails(tourneyDetails);

      // EN DETAILS TIENEN TODA LA INFO DE LOS TIERS DEL TORNEO
      // NO HARIA FALTA ESTADOS PARA CADA UNO

      // * setTeamNameUpdate
      // Quarters
      if (tourneyDetails.quarterA.length === 2) {
        setQuarterA1(tourneyDetails.quarterA[0].name);
        setQuarterA2(tourneyDetails.quarterA[1].name);
        //  } else if (tourneyDetails.quarterB.length === 2) {
        setQuarterB1(tourneyDetails.quarterB[0].name);
        setQuarterB2(tourneyDetails.quarterB[1].name);
        //  } else if (tourneyDetails.quarterC.length === 2) {
        setQuarterC1(tourneyDetails.quarterC[0].name);
        setQuarterC2(tourneyDetails.quarterC[1].name);
        // } else if (tourneyDetails.quarterD.length === 2) {
        setQuarterD1(tourneyDetails.quarterD[0].name);
        setQuarterD2(tourneyDetails.quarterD[1].name);
      }

      // semifinals
      if (tourneyDetails.semiA.length === 2) {
        setSemiA1(tourneyDetails.semiA[0].name);
        setSemiA2(tourneyDetails.semiA[1].name);
      }

      if (tourneyDetails.semiB.length === 2) {
        setSemiB1(tourneyDetails.semiB[0].name);
        setSemiB2(tourneyDetails.semiB[1].name);
      }
      if (tourneyDetails.final.length === 2) {
        setFinal1(tourneyDetails.final[0].name);
        setFinal2(tourneyDetails.final[1].name);
      }
      if (tourneyDetails.winner !== undefined) {
        setWinner(tourneyDetails.winner.name);
      }
      // winner

      // final

      // * setScoreUpdate
      // quarters
      setScoreQA1(tourneyDetails.scoreQA1);
      setScoreQA2(tourneyDetails.scoreQA2);
      setScoreQB1(tourneyDetails.scoreQB1);
      setScoreQB2(tourneyDetails.scoreQB2);
      setScoreQC1(tourneyDetails.scoreQC1);
      setScoreQC2(tourneyDetails.scoreQC2);
      setScoreQD1(tourneyDetails.scoreQD1);
      setScoreQD2(tourneyDetails.scoreQD2);
      // semifinals
      setScoreSA1(tourneyDetails.scoreSA1);
      setScoreSA2(tourneyDetails.scoreSA2);

      setScoreSB1(tourneyDetails.scoreSB1);
      setScoreSB2(tourneyDetails.scoreSB2);
      // finals
      setScoreF1(tourneyDetails.scoreF1);
      setScoreF2(tourneyDetails.scoreF2);

      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

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

  const handleStartSort = async (e) => {
    e.preventDefault();
    try {
      const response = await sortTeamsToTourneyService(tourneyId);

      getData();

      // CUANDO HAGAN EL SORT, ACTUALIZAN LOS DETALLES
      // KATA => TIENE UNA ESTRUCTURA DE DATA CON VARIOS ARRAYS
      // ACTUALIZAR CADA ARRAY CON LOS VALORES ABAJO
      setQuarterA1(response.data[0].name);
      setQuarterA2(response.data[1].name);
      setQuarterB1(response.data[2].name);
      setQuarterB2(response.data[3].name);
      setQuarterC1(response.data[4].name);
      setQuarterC2(response.data[5].name);
      setQuarterD1(response.data[6].name);
      setQuarterD2(response.data[7].name);

      navigate(`/list/${tourneyId}/details`);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return   <Spinner animation="border" variant="light" />
  }

  const handleEditLink = (e) => {
    navigate(`/list/${tourneyId}/details/edit`);
  };

  return (
    <div className="tourney-list">
      <h3>TourneyDetails</h3>

      <header className="hero">
        <div className="hero-wrap">
          <p className="intro" id="intro">
            {/* {details.game} */}
          </p>
          <h1 id="headline">Tournament</h1>
          <p className="year">
            <i className="fa fa-star"></i> {details.name}
            <i className="fa fa-star"></i>
          </p>
          {/* <p>{details.name}</p> */}
        </div>
      </header>

      <section id="bracket">
        <div className="container">
          <div className="split split-one">
            <div className="round round-one current">
              <div className="round-details">
                Round 1<br />
                <span className="date">Day 1</span>
              </div>
              <ul className="matchup">
                <li className="team team-top">
                  {quarterA1}
                  <span className="score">{scoreQA1}</span>
                </li>
                <li className="team team-bottom">
                  {quarterA2}
                  <span className="score">{scoreQA2}</span>
                </li>
              </ul>
              <ul className="matchup">
                <li className="team team-top">
                  {quarterB1}
                  <span className="score">{scoreQB1}</span>
                </li>
                <li className="team team-bottom">
                  {quarterB2}
                  <span className="score">{scoreQB2}</span>
                </li>
              </ul>
            </div>
            {/* <!-- END ROUND ONE --> */}

            <div className="round round-two">
              <div className="round-details">
                Round 2<br />
                <span className="date">Day 2</span>
              </div>
              <ul className="matchup">
                <li className="team team-top">
                  {semiA1}
                  <span className="score">{scoreSA1}</span>
                </li>
                <li className="team team-bottom">
                  {semiA2}
                  <span className="score">{scoreSA2}</span>
                </li>
              </ul>
            </div>
          </div>
          {/* <!-- END ROUND TWO --> */}
          {/*  END ROUND THREE   */}
          <div className="champion">
            <div className="semis-l">
              <div className="round-details">
                Final <br />
                <span className="date">Day 3</span>
              </div>
              <ul className="matchup championship">
                <li className="team team-top">
                  {final1}
                  <span className="score">{scoreF1}</span>
                </li>
                <li className="team team-bottom">
                  {final2}
                  <span className="score">{scoreF2}</span>
                </li>
              </ul>
            </div>
            <div className="semis-l">
              {" "}
              <span className="round-details">champion</span>
              <i className="fa fa-trophy"></i>
              <ul className="matchup championship">
                <li className="team team-top">
                  {winner}
                  <span className="vote-count"></span>
                </li>
              </ul>
            </div>
          </div>

          <div className="split split-two">
            {/* END ROUND THREE  */}

            <div className="round round-two">
              <div className="round-details">
                Round 2<br />
                <span className="date">Day 2</span>
              </div>
              <ul className="matchup">
                <li className="team team-top">
                  {semiB1}
                  <span className="score">{scoreSB1}</span>
                </li>
                <li className="team team-bottom">
                  {semiB2}
                  <span className="score">{scoreSB2}</span>
                </li>
              </ul>
            </div>

            {/* END ROUND TWO  */}

            <div className="round round-one current">
              <div className="round-details">
                Round 1<br />
                <span className="date">Day 2</span>
              </div>
              <ul className="matchup">
                <li className="team team-top">
                  {quarterC1}
                  <span className="score">{scoreQC1}</span>
                </li>
                <li className="team team-bottom">
                  {quarterC2}
                  <span className="score">{scoreQC2}</span>
                </li>
              </ul>
              <ul className="matchup">
                <li className="team team-top">
                  {quarterD1}
                  <span className="score">{scoreQD1}</span>
                </li>
                <li className="team team-bottom">
                  {quarterD2}
                  <span className="score">{scoreQD2}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* END ROUND ONE */}
      </section>
   

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

      {isLoggedIn === true ? (
        <Button
          disabled={false}
          variant="outline-secondary"
          id="button-addon3"
          onClick={handleAddTeamToTourney}
        >
          signup Team
        </Button>
      ) : (
        <Button disabled={true} onClick={handleAddTeamToTourney}>
          signup Team
        </Button>
      )}
      {errorMessage !== "" && <p style={{ color: "red" }}>{errorMessage}</p>}

      {(user?.user.role === "admin" || user?.user._id === details.creator) && (
        <Button
          variant="outline-secondary"
          id="button-addon3"
          onClick={handleEditLink}
        >
          Edit Tourney
        </Button>
      )}
    </div>
  );
}

export default TourneyDetails;
