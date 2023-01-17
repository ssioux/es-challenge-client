import React from "react";

function Instructions() {
  return (
    <div className="instructions-container">
      <div>
        <h1>
          Follow the instructions bellow to become a <span>Tourney Master</span>
        </h1>
      </div>

      <div className="instructions-card">
        <div className="instructions-card-img">
          <img src="../../images/create-team-ss.png" alt="create-team" />
        </div>
        <div className="instructions-card-text">
          <h3>Create your Team</h3>
          <ul>
            <li>First of all, create your team to join any tournament.</li>
            <li>
              Write a password and don't forget it, because your team members
              must write it to join the team.
            </li>
          </ul>
        </div>
      </div>
      <div className="instructions-card">
        <div className="instructions-card-text">
          <h3>Search and join the teams of your friends</h3>
          <ul>
            <li>Select the team which you want to register.</li>
            <li>Introduce the password and be ready for the tourney.</li>
          </ul>
        </div>
        <div className="instructions-card-img">
          <img
            src="../../images/team-toadd-screen-shot.png"
            alt="create-team"
          />
        </div>
      </div>
      <div className="instructions-card">
        <div className="instructions-card-img">
          <img src="../../images/create-game-ss.png" alt="create-team" />
        </div>
        <div className="instructions-card-text">
          <h3>Game</h3>
          <ul>
            <li>Think about your favourite game and choose a picture.</li>
            <li>
              Fill the form. Remind the name, you will use it in the next step.
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h1>
          🚀 Now, you are ready to create your <span>Own Tourney</span>
        </h1>
      </div>
      <div className="instructions-card">
        <div className="instructions-card-text">
          <h3>Tournament</h3>
          <ul>
            <li>Fill the form.</li>
            <li>Wait until the eight teams will be registered.</li>
            <li>Button Start will be enabled, press and edit the Tourney.</li>
          </ul>
        </div>
        <div className="instructions-card-img">
          <img src="../../images/create-tourney-ss.png" alt="create-team" />
        </div>
      </div>
    </div>
  );
}

export default Instructions;
