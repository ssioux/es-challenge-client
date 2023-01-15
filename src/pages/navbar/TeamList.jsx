// React Hooks
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Axios Services
import { listTeamsService } from "../../services/team.services";
// Bootstrap Components
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

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
    <div className="general-container"> 
      {/* <CardGroup> */}
      
        <div className="tourney-header">
          <div className="tourney-header-div1">
            <h2>Teams</h2>
            <InputGroup className="mb-3" style={{ marginTop: "10px", width: "50%" }}>
              <Form.Control
              className="input-search-list"
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
