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

function TourneyList() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  // create state to store the data
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await listTourneysService();

      console.log(response.data);

      setList(response.data);

      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>Loading . . .</h3>;
  }

  return (
    <div>
      <h3>Tourney List</h3>

        {list.map((eachTourney) => {
          return (
            // <Card key={eachTourney._id} style={{ opacity: "0.6" }}>
            //   <Card.Img variant="top" src={eachTourney.game.picture} />
            //   <Card.Body>
            //     <Card.Title>
            //       <Link to={`/list/${eachTourney._id}/details`}>
            //         {eachTourney.name}
            //       </Link>
            //     </Card.Title>
            //     <Card.Text>Game: {eachTourney.game.name}</Card.Text>
            //     <Card.Text>Teams: {eachTourney.teams.length}/8</Card.Text>
            //     <Card.Text>Start Date: {eachTourney.description}</Card.Text>
            //   </Card.Body>
            //   <Card.Footer>
            //     <small className="text-muted">Register your Team</small>
            //   </Card.Footer>
            // </Card>

             <Card key={eachTourney._id} style={{ height: "12rem" ,width: '40rem', margin:"auto", opacity: "0.6"}}>
             <div style={{display:"flex"}}>
              <div width="20rem">
                 <Card.Img  src={eachTourney.game.picture} style={{width: "60%", marginTop: "25px"}}/>
              </div>
              <div>
                 <Card.Body style={{width:"400px"}}>
                  {isLoggedIn === true ? <Card.Title><Link to={`/list/${eachTourney._id}/details`}>{eachTourney.name}</Link></Card.Title>
                  : <Card.Title><Link  to="/signup">{eachTourney.name}</Link></Card.Title>}
                  <Card.Text>Game:{eachTourney.game.name}</Card.Text>
                  <Card.Text>teams:{eachTourney.teams.length}/8</Card.Text>
                  <Card.Text>Description:{eachTourney.description}</Card.Text>
                 </Card.Body>
              </div>
             </div>
             </Card>
          );
        })}
      
    </div>
  );
}

export default TourneyList;
