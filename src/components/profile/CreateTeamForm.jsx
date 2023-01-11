import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import {
  createTeamService,
  findTeamCreatorService,
} from "../../services/team.services";
import { uploadPictureService } from "../../services/upload.services.js";

function CreateTeamForm(props) {
  const navigate = useNavigate();

  const [nameInput, setNameInput] = useState("");
  const [nameTagInput, setNameTagInput] = useState("");
  // const [pictureInput, setPictureInput] = useState()
  const [joinPasswordInput, setJoinPasswordInput] = useState("");
  const [pictureURL, setPictureUrl] = useState("");
  const [isLoadingPicture, setIsLoadingPicture] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");


  const [isFetching, setIsFetching] = useState(true);

  const handleNameChange = (e) => setNameInput(e.target.value);
  const handNameTagChange = (e) => setNameTagInput(e.target.value);
  const handleJoinPasswordChange = (e) => setJoinPasswordInput(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const teamToCreate = {
      name: nameInput,
      nameTag: nameTagInput,
      picture: pictureURL,
      joinPassword: joinPasswordInput,
    };

    try {
      await createTeamService(teamToCreate);

      // navigate("/profile")
      props.updateTeamCreated();
      props.setCreateTeam(false)
      props.setYourTeam(true)

      setIsFetching(false);
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
        setErrorMessage2(error.response.data.errorMessage2)
      } else {
        navigate(error);
      }
    }
  };
  const handlePictureChange = async (e) => {
    setIsLoadingPicture(true);

    // setPictureInput(e.target.value)

    const sendObj = new FormData();
    sendObj.append("picture", e.target.files[0]);

    try {
      const response = await uploadPictureService(sendObj);

      setPictureUrl(response.data.picture);
      setIsLoadingPicture(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    <h3>...Loading</h3>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Create new Team</h1>
      <hr />
      <Form style={{ display: "flex" }}>
        <fieldset>
          <Form.Group className="mb-3">
          <Form.Label htmlFor="Name">{((errorMessage2 !== "" && nameInput === "") || (errorMessage === "Name must have min 4 letters"))&& <span className="error-message">{errorMessage2}</span>}Name</Form.Label>
            <Form.Control
              value={nameInput}
              onChange={handleNameChange}
              id="disabledTextInput"
              placeholder="Name of Team"
            /> 
            
          </Form.Group>
         
          <Form.Group className="mb-3">
            <Form.Label htmlFor="nameTagdescription">{((errorMessage2 !== "" && nameTagInput === "") || (errorMessage === "Name Tag must have max 3 characters")) && <span className="error-message">{errorMessage2}</span>}Name Tag:</Form.Label>
            <Form.Control
              value={nameTagInput}
              onChange={handNameTagChange}
              id="disabledTextInput"
              placeholder="Your Tag"
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label htmlFor="picture">Picture</Form.Label>
            <Form.Control
              onChange={handlePictureChange}
              type="file"
              name="picture"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="joinPassword">{((errorMessage2 !== "" && joinPasswordInput === "") || (errorMessage === "Join Password must have min 4 characters")) && <span className="error-message">{errorMessage2}</span>}JoinPassword: </Form.Label>
            <Form.Control
              value={joinPasswordInput}
              onChange={handleJoinPasswordChange}
              type="text"
              placeholder="Password for user to join"
            />
          </Form.Group>
          
          {isLoadingPicture === true && <p>...loading picture</p>}

          {pictureURL !== "" ? (
            <img src={pictureURL} alt="pict" width={200} />
          ) : (
            <p>Choose image</p>
          )}

          <Button type="submit" onClick={handleSubmit}>
            Create your Team
          </Button>
          {errorMessage !== "" && <p className="error-message">{errorMessage}</p>}
        </fieldset>
      </Form>
    </div>
  );
}

export default CreateTeamForm;
