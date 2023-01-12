// React Imports
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Axios Services
import { createGameService } from "../../services/game.services";
import { uploadPictureService } from "../../services/upload.services";

function CreateGameForm() {
  const navigate = useNavigate();

  // Keep Value from Input
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const [isLoadingPicture, setIsLoadingPicture] = useState(false);

  // Keep the picture from cloudinary
  const [pictureURL, setPictureUrl] = useState("");

  // Takes the value from input
  const handleNameChange = (e) => setNameInput(e.target.value);
  const handDescriptionChange = (e) => setDescriptionInput(e.target.value);

  const handlePictureChange = async (e) => {
    setIsLoadingPicture(true);

    // Send the pic to cloudinary
    const sendObj = new FormData();
    sendObj.append("picture", e.target.files[0]);

    try {
      const response = await uploadPictureService(sendObj);
      // Receive the data.pic from cloudinary for show it in the form
      setPictureUrl(response.data.picture);
      // The process is finished
      setIsLoadingPicture(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const gameToAdd = {
      name: nameInput,
      description: descriptionInput,
      picture: pictureURL,
    };

    try {
      // Send the new game info to BE for Create the Game in data base
      await createGameService(gameToAdd);
      navigate("/profile");
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div id="create-game-container">
      <div className="create-team-container">
        <form>
          <h3>Create New Game</h3>

          <div className="input-container">
            <input value={nameInput} onChange={handleNameChange} />
            <label className={nameInput && "filled"} htmlFor="name">
              Name
            </label>
          </div>
          <div className="input-container">
            <input value={descriptionInput} onChange={handDescriptionChange} />
            <label
              className={descriptionInput && "filled"}
              htmlFor="description"
            >
              Description
            </label>
          </div>
          <div className="uploader-pic">
            <input onChange={handlePictureChange} type="file" name="picture" />
            <label htmlFor="picture">Picture</label>
          </div>
    {/* Show the picture in this form after Load */}
          {isLoadingPicture === true && <p>...loading picture</p>}
          {pictureURL !== "" ? (
            <img src={pictureURL} alt="pict" className="uploader-img" />
          ) : (
            <p> [ No Picture Selected ]</p>
          )}

          <button type="submit" onClick={handleSubmit}>
            Create Game
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateGameForm;
