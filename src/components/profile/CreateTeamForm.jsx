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
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
        setErrorMessage2(error.response.data.errorMessage2);
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
    <section id="create-team-container">
      <div className="create-team-container">
      <form>
        <h3>Create Your Team</h3>
        <div className="input-container">
          <input
            value={nameInput}
            onChange={handleNameChange}
            id="disabledTextInput"
          />
          <label className={nameInput && "filled"} htmlFor="name">
            {((errorMessage2 !== "" && nameInput === "") ||
              errorMessage === "Name must have min 4 letters") && (
              <span className="error-message">{errorMessage2}</span>
            )}
            Name
          </label>
        </div>

        <div className="input-container">
          <input
            value={nameTagInput}
            onChange={handNameTagChange}
            id="disabledTextInput"
          />
          <label className={nameTagInput && "filled"} htmlFor="nameTag">
            {((errorMessage2 !== "" && nameTagInput === "") ||
              errorMessage === "Name Tag must have max 3 characters") && (
              <span className="error-message">{errorMessage2}</span>
            )}
            Name Tag
          </label>
        </div>

        

        <div className="input-container">
          <input
            value={joinPasswordInput}
            onChange={handleJoinPasswordChange}
            type="text"
          />
          <label
            className={joinPasswordInput && "filled"}
            htmlFor="joinPassword"
          >
            {((errorMessage2 !== "" && joinPasswordInput === "") ||
              errorMessage === "Join Password must have min 4 characters") && (
              <span className="error-message">{errorMessage2}</span>
            )}
            Password for Join{" "}
          </label>
        </div>
        <div className="uploader-pic">
          <input onChange={handlePictureChange} type="file" name="picture" />
          <label htmlFor="picture">Team Picture</label>
        </div>
        {isLoadingPicture === true && <p>...loading picture</p>}

        {pictureURL !== "" ? (
          <img src={pictureURL} alt="yourPic" width={200} className="uploader-img"  />
        ) : (
          <p> [ No Picture Selected ]</p>
        )}

        <button type="submit" onClick={handleSubmit}>
          Accept
        </button>
        {errorMessage !== "" && <p className="error-message">{errorMessage}</p>}
      </form>
      </div>
    </section>
  );
}

export default CreateTeamForm;
