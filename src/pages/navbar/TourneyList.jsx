// React Hooks
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// Data RestApi
import { listTourneysService } from "../../services/tourney.services.js";

// import CreateTourneyForm from "../profile/CreateTourneyForm.jsx"

import { AuthContext } from "../../context/auth.context";

// bootstrap
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Button, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";


function TourneyList() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  // create state to store the data
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [tourneyListSearch, setTourneyListSearch] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await listTourneysService();

      console.log(response.data);

      setList(response.data);
      setTourneyListSearch(response.data)

      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  // ***** Tourney Browser
  const filterTourneys = (filterQuery) => {
    const filteredArr = list.filter((eachTourney) => {
      return eachTourney.name.toLowerCase().includes(filterQuery.toLowerCase());
    });
    setTourneyListSearch(filteredArr);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    filterTourneys(event.target.value);
  }
  
  if (isFetching === true) {
    return <h3>Loading . . .</h3>;
  }

  return (
    <div className="general-container">
    <div className="tourney-header">
      <div className="tourney-header-div1">
        <h2>Tournaments</h2>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="search"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={searchInput}
            onChange={handleSearchChange}
          />
          <Button variant="outline-secondary" id="button-addon2">
            Search 
          </Button>
        </InputGroup>
      </div>
      <div className="tourney-header-div2">
        <p> Elige un torneo y regístrate en él, date prisa porque sólamente hay 8 plazas y se completan muy rápido. Si todavía no tienes equipo, pulsa <span>aquí</span> para dirigirte a tu perfil y crear tu propio equipo. Una vez que estés registrado, presta atención a la fechas de cada fase, si no jugáiss la partida dentro de esas fechas, automáticamente quedaréis eliminados.</p>
      </div>
    </div>
     
      <div className="card-container">
        {tourneyListSearch.map((eachTourney) => {
          return (
            <Link key={eachTourney._id} to={`/list/${eachTourney._id}/details`}>
              <div className="tourney-card">
                <div className="tourney-card-image">
                  <img src={eachTourney.game.picture} alt="Card image" />
                </div>

                <div className="tourney-card-content">
                  <div>
                    <h4>{eachTourney.name}</h4>
                  </div>
                  <div>
                    <p>Game: {eachTourney.game.name}</p>
                  </div>
                  <div>
                    <p>teams: {eachTourney.teams.length}/8</p>
                  </div>
                  <div>
                    <p>Description: {eachTourney.description}</p>
                  </div>
                </div>
              </div>
            </Link>

          );
        })}
      </div>
    </div>
  );
}

export default TourneyList;
