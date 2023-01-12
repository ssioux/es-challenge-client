// Services API
import { detailsTourneyService } from "../../services/tourney.services";
// React
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// Components
import TourneyBracket from "./TourneyBracket";
import TourneyListTeams from "./TourneyListTeams";
// npm
import Spinner from "react-bootstrap/Spinner";

function TourneyMain() {
  const { tourneyId } = useParams();
  const navigate = useNavigate();
  const [tourneyDetails, setTourneyDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await detailsTourneyService(tourneyId);

      setTourneyDetails(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <Spinner animation="border" variant="light" />;
  }
  return (
    <div>
      {tourneyDetails.active === false ? (
        <TourneyListTeams mainData={getData}  />
      ) : (
        <TourneyBracket />
      )}
    </div>
  );
}

export default TourneyMain;
