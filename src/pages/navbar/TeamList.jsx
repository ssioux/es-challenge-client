import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listTeamsService } from "../../services/team.services";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// import CardGroup from 'react-bootstrap/CardGroup';

function TeamList() {
  const navigate = useNavigate();
  const [teamList, setTeamList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [teamListSearch, setTeamListSearch] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const allTeams = await listTeamsService();

      setTeamList(allTeams.data);
      setTeamListSearch(allTeams.data);

      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const filterTeams = (filterQuery) => {
    const filteredArr = teamList.filter((eachTeam) => {
      return eachTeam.name.toLowerCase().includes(filterQuery.toLowerCase());
    });
    setTeamListSearch(filteredArr);
  };

  // const copy = [...teamList]
  // setTeamListSearch(copy)

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
    filterTeams(event.target.value);
  };

  if (isFetching === true) {
    return <h3>...Loading</h3>;
  }

  return (
    <div>
      {/* <CardGroup> */}
      <div className="search-team">
        <h5>Find your team and sign up</h5>
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
      <div className="teams-container">
        {teamListSearch.map((eachTeam) => {
          return (
            <Link to={`/team/${eachTeam._id}/details`}>
              <div className="card-team" key={eachTeam._id}>
                <div className="div-img">
                  <Card.Img variant="top" src={eachTeam.picture} />
                </div>
                <div className="name">
                  <h5>{eachTeam.name}</h5>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default TeamList;
