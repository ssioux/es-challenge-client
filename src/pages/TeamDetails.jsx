import { useContext, useEffect, useState } from "react";
import {
  addMemberTeamService,
  detailsTeamService,
  removeMemberTeamService,
} from "../services/team.services";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../context/auth.context";

function TeamDetails() {
  const { isLoggedIn, user } = useContext(AuthContext);
  console.log("user", user);

  const { teamId } = useParams();

  const navigate = useNavigate();

  const [teamDetails, setTeamDetails] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [passToggle, setPassToggle] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getData();
  }, []);
  // Get the team Details data from API
  const getData = async () => {
    try {
      const details = await detailsTeamService(teamId);
      console.log("🚀 ~ file: TeamDetails.jsx:41 ~ getData ~ details", details);

      setTeamDetails(details.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };
  if (isFetching === true) {
    return <h3>...Loading</h3>;
  }
  // Search the user into the current team
  const filteredUser = teamDetails?.members.filter((eachMember) => {
    return eachMember?._id === user?.user?._id;
  });

  // Toggle that opens the input password
  const toggleJoinTeam = async (e) => {
    setPassToggle(true);
  };
  // Get the pinput Password and save it in the State
  const handlePasswordChange = (e) => {
    e.preventDefault();

    setPasswordInput(e.target.value);
  };
  // Add the member to the current team throgh Axios Services to the BE route.
  const handlAcceptTeam = async (e) => {
    e.preventDefault();

    setPassToggle(false);

    const pass = { password: passwordInput };
    try {
      await addMemberTeamService(teamId, pass);
      //if the member is added read again the Data and erase the errorMessage and the password previusly added
      getData();
      setErrorMessage("");
      setPasswordInput("");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
        setPasswordInput("");
      } else {
        navigate("/error");
      }
    }
  };

  // Remove the member from the current team throgh Axios Services to the BE route.
  const handleRemoveMember = async (e) => {
    e.preventDefault();
    try {
      await removeMemberTeamService(teamId);
      getData();
    } catch (error) {
      navigate(error);
    }
  };

  return (
    <div>
      <h3>team details</h3>
      <Card
        style={{
          margin: "auto",
          width: "20rem",
          marginBotton: "20px",
          opacity: "0.7",
        }}
      >
        <Card.Img variant="top" src={teamDetails.picture} />
        <Card.Body>
          <Card.Title>{teamDetails.name}</Card.Title>
          <Card.Text>Members:</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          {teamDetails.members.map((eachMember) => {
            return (
              <ListGroup.Item key={eachMember._id}>
                {teamDetails.nameTag} - {eachMember.username}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
        {isLoggedIn &&
          (filteredUser[0]?._id === user?.user?.id ? (
            <Button
              type="submit"
              variant="outline-secondary"
              id="button-addon3"
              onClick={toggleJoinTeam}
            >
              Join Team
            </Button>
          ) : (
            <Button
              type="submit"
              variant="outline-secondary"
              id="button-addon3"
              onClick={handleRemoveMember}
            >
              Remove from Team
            </Button>
          ))}

        {passToggle && (
          <InputGroup className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={passwordInput}
              onChange={handlePasswordChange}
            />
            <Button
              type="submit"
              variant="outline-secondary"
              id="button-addon3"
              onClick={handlAcceptTeam}
            >
              Accept
            </Button>
          </InputGroup>
        )}

        {errorMessage !== "" && <p className="error-message">{errorMessage}</p>}
      </Card>
    </div>
  );
}

export default TeamDetails;
