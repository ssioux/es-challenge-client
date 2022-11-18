import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listTeamsService } from "../../services/team.services";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
// import CardGroup from 'react-bootstrap/CardGroup';


function TeamList() {
  const navigate = useNavigate();
  const [teamList, setTeamList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [teamListSearch, setTeamListSearch] = useState([])
  const [searchInput, setSearchInput] = useState("")
  

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
   

    

   const filterTeams = (filterQuery) => {
  
   
     const filteredArr = teamList.filter((eachTeam) => {
      return eachTeam.name.toLowerCase().includes(filterQuery.toLowerCase())
     })
     setTeamListSearch(filteredArr)
 
   }
   console.log("teamlistSearch",teamListSearch)
  
    // const copy = [...teamList]
    // setTeamListSearch(copy)

  

  const handleSearchChange = (event) => {
    
    setSearchInput(event.target.value)
    filterTeams(event.target.value)
  }
     
      

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
   <div style={{display:"block", width:"25%", margin:"auto"}}>
       <h5 style={{color:"white"}}>Find your team and sign up</h5>
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
  <div style={{display:"flex", flexWrap:"wrap",gap:"40px"}}>
     {
      
      teamListSearch.map((eachTeam) => {
     return (
      <Card key={eachTeam._id} style={{ width: '12rem', marginBotton: "20px", opacity:"0.7"}}>
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
        <Link to={`/team/${eachTeam._id}/details`}>Team Details</Link>
        {/* <Card.Link href="#">Another Link</Card.Link> */}
      </Card.Body>
    </Card>
 

           );
         })}
  </div>
              
 
            {/* </CardGroup> */}
    </div>
  );
}


export default TeamList;
