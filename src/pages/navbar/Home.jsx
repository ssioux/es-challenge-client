import Instructions from "../../components/Instructions";
import { HashLink } from "react-router-hash-link";

function Home() {
  return (
    <div className="home">
      <div className="home-title">
        <div className="home-title-text">
          <h1>Wellcome to esChallenge</h1>
          <h4>Join us and create your favourite game's tourney</h4>
        </div>
        <div className="home-button-instructions">
          <HashLink smooth to="/#Instructions">
            <button>Instructions</button>
          </HashLink>
        </div>
      </div>
      <div className="home-image-tourney">
        <img src="../../../images/tourney-screen-shot.png" alt="screen-shot" />
      </div>
      <div id="Instructions">
        <Instructions />
      </div>
    </div>
  );
}

export default Home;
