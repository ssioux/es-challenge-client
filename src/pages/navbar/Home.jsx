// * IMPORTS
// Components
// import Header from "../../components/home/Header";

import Instructions from "../../components/Instructions";
import { HashLink } from 'react-router-hash-link';

function Home() {

  return (
    

    
    <div className="home">
      {/* <Header /> */}

      {/* <div className="home-braket-pic">
<img src="../../../images/braket-show.png" alt="show-braket-home" />

      </div> */}

      <div className="home-paraph">
        <p id="title-access">
          {" "}
          <span>Login Access </span>
        </p>
        <p>Feel free as an admin using the user bellow:</p>
        <p>
          <span>E-mail: </span>user1@user1.com
        </p>
        <p>
          {" "}
          <span>Password:</span> Banana99!
        </p>
      </div>

      <div className="home-title">
        <div>
          <h1>Wellcome to esChallenge</h1>
          <h4>Join us and create your favourite game's tourney</h4>
        </div>
        <div className="home-button-instructions">
          <HashLink
            smooth to ="/#Instructions"
           
          >
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
