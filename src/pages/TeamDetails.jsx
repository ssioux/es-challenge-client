// React Hooks
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
// Axios Services
import {
  addMemberTeamService,
  detailsTeamService,
  removeMemberTeamService,
} from "../services/team.services";
// Bootstrap Imports
import Button from "react-bootstrap/Button";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function TeamDetails() {
  const { isLoggedIn, user } = useContext(AuthContext);

  const { teamId } = useParams();

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [teamDetails, setTeamDetails] = useState();
  const [isFetching, setIsFetching] = useState(true);
  // Toggle for add the password to join the team
  const [passToggle, setPassToggle] = useState(false);
  // Keeps the joinPassword
  const [passwordInput, setPasswordInput] = useState("");

  useEffect(() => {
    getData();
  }, []);
  // Get the team Details data from API
  const getData = async () => {
    try {
      const details = await detailsTeamService(teamId);

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
  const toggleJoinTeam = async () => {
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
    <div className="team-details-container">
      <h1>{teamDetails.name}</h1>
      <div className="team-info-details">
        <div className="team-info-shield">
          <img src={teamDetails.picture} alt="shield" />
        </div>

        <div className="data-team">
        
            {teamDetails.members.map((eachMember) => {
              return (
               
                  <h4 key={eachMember._id}>- {eachMember.username}</h4>
               
              );
            })}
     

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

          {errorMessage !== "" && (
            <p className="error-message">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamDetails;
