// React Hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Axios Services
import { createTourneyService } from "../../services/tourney.services";
import { listGamesService } from "../../services/game.services";

function CreateTourneyForm(props) {
  const navigate = useNavigate();
  // Keeps the input value
  const [nameInput, setNameInput] = useState("");
  const [gameInput, setGameInput] = useState();
  const [descriptionInput, setDescriptionInput] = useState("");
  const [listGames, setListGames] = useState([]);
  // Takes input value
  const handleNameChange = (e) => setNameInput(e.target.value);
  const handleGameChange = (e) => setGameInput(e.target.value);
  const handleDescriptionChange = (e) => setDescriptionInput(e.target.value);
  //Take data from BE to get the Game List
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const responseGames = await listGamesService();
      setListGames(responseGames.data);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTourney = {
      name: nameInput,
      game: gameInput,
      description: descriptionInput,
    };
    try {
      // contact to server to create the Tourney and give us the response
      await createTourneyService(newTourney);

      navigate("/");
    } catch (error) {
      navigate("/error");
    }
  };
  return (
    <div id="create-tourney-container">
      <div className="create-team-container">
        <form>
          <h3>Create a Tourney</h3>
          <div className="input-container">
            <input value={nameInput} onChange={handleNameChange} />
            <label className={nameInput && "filled"} htmlFor="Name">
              Name
            </label>
          </div>
          <div className="input-container">
            <input
              value={descriptionInput}
              onChange={handleDescriptionChange}
            />
            <label
              className={descriptionInput && "filled"}
              htmlFor="description"
            >
              Description
            </label>
          </div>

          <div className="select-option">
            <label htmlFor="Game">Choose your Game</label>

            <select onChange={handleGameChange}>
              {listGames.map((opt) => {
                return (
                  <option key={opt._id} value={opt._id}>
                    {opt.name}
                  </option>
                );
              })}
            </select>
          </div>

          <button type="submit" onClick={handleSubmit}>
            Create Tourney
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTourneyForm;
