import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listTeamsService } from "../../services/team.services";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import CardGroup from 'react-bootstrap/CardGroup';


function TeamList() {
  const navigate = useNavigate();
  const [teamList, setTeamList] = useState();
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const allTeams = await listTeamsService();
      console.log("ASSDDDDDDDD",allTeams)
      setTeamList(allTeams.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>...Loading</h3>;
  }

  return (
    // <div>
    //   <h3>TeamList</h3>
    //   <ListGroup>
      
    //     {teamList.map((eachTeam) => {
    //       return (
    //         <div key={eachTeam._id}>
    //          <ListGroup.Item variant="dark"> <p>
    //             <Link to={`/team/${eachTeam._id}/details`}>
    //               {eachTeam.name}
    //             </Link>
    //           </p></ListGroup.Item>
    //         </div>
    //       );
    //     })}
        
    //   </ListGroup>
    // </div>
<div>
{/* <CardGroup> */}

{teamList.map((eachTeam) => {
  return (
    <Card key={eachTeam._id} style={{ width: '12rem', marginBotton: "20px"}}>
      <Card.Img variant="top" src={eachTeam.picture} />
      <Card.Body>
        <Card.Title>{eachTeam.name}</Card.Title>
        <Card.Text>
          Members:
        </Card.Text>
      </Card.Body>
 
      <ListGroup className="list-group-flush">
      {eachTeam.members.map((eachMember) => {
        return (
        <ListGroup.Item key={eachMember._id}>{eachTeam.nameTag} - {eachMember.username}</ListGroup.Item>
     
        ); 
       
  })}
     </ListGroup>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
 

           );
         })}
              
 
            {/* </CardGroup> */}
    </div>
  );
}


export default TeamList;
