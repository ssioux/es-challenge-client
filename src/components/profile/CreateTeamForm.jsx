// React Imports
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// Axios Services
import { createTeamService } from "../../services/team.services";
import { uploadPictureService } from "../../services/upload.services.js";

function CreateTeamForm(props) {
  const navigate = useNavigate();

  // *********** States ******//
  // input States
  const [nameInput, setNameInput] = useState("");
  const [nameTagInput, setNameTagInput] = useState("");
  const [joinPasswordInput, setJoinPasswordInput] = useState("");
  const [pictureURL, setPictureUrl] = useState("");
  // Cloudinary is Loading
  const [isLoadingPicture, setIsLoadingPicture] = useState(false);
  // Error messages from BE
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  // Data is Loading
  const [isFetching, setIsFetching] = useState(true);

  // Keep the input value in the state
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
      // Service to BE Route for create new game
      await createTeamService(teamToCreate);

      props.updateTeamCreated();
      // Desactivates the Create Team Button
      props.setCreateTeam(false);
      // Activates the Show your Team Button
      props.setYourTeam(true);
      // Proccess is Done
      setIsFetching(false);
    } catch (error) {
      // Validators from BE
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
        setErrorMessage2(error.response.data.errorMessage2);
      } else {
        navigate(error);
      }
    }
  };
  const handlePictureChange = async (e) => {
    // Cloudinary picture is Loading On
    setIsLoadingPicture(true);

    // upload the picture to cloudinary and receive the string for show the pic in the form
    const sendObj = new FormData();
    sendObj.append("picture", e.target.files[0]);

    try {
      const response = await uploadPictureService(sendObj);

      setPictureUrl(response.data.picture);
      // Cloudinary picture is Loading Off
      setIsLoadingPicture(false);
    } catch (error) {
      navigate("/error");
    }
  };
  // Creating team ins loading
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
                errorMessage ===
                  "Join Password must have min 4 characters") && (
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
          {/* Show the upload picture in this form */}
          {pictureURL !== "" ? (
            <img
              src={pictureURL}
              alt="yourPic"
              width={200}
              className="uploader-img"
            />
          ) : (
            <p> [ No Picture Selected ]</p>
          )}
          <button type="submit" onClick={handleSubmit}>
            Accept
          </button>
          {errorMessage !== "" && (
            <p className="error-message">{errorMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
}

export default CreateTeamForm;
