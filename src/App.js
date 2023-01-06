// * Imports
// general
import { Route, Routes } from "react-router-dom";
import "./App.css";
import IsPrivate from "./components/IsPrivate";


// pages
import Error from "./pages/error/Error";
import Home from "./pages/navbar/Home";
import Login from "./pages/navbar/Login";
import NotFound from "./pages/error/NotFound";
import Profile from "./pages/navbar/Profile";
import Signup from "./pages/navbar/Signup";
import TeamDetails from "./pages/TeamDetails";
import TeamList from "./pages/navbar/TeamList";

// components
import NavBar from "./components/NavBar";
import CreateGameForm from "./components/profile/CreateGameForm";
import CreateTeamForm from "./components/profile/CreateTeamForm";
import CreateTourneyForm from "./components/profile/CreateTourneyForm";
import InfoEdit from "./components/profile/InfoEdit";
import EditFormTourney from "./components/Tourney/EditFormTourney";

import TourneyList from "./pages/navbar/TourneyList";
import TourneyMain from "./components/Tourney/TourneyMain.jsx"




function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={<IsPrivate><Profile /></IsPrivate>}/>
        <Route path="/tourneys" element={<TourneyList />} />

        <Route path="/team/:teamId/details" element={<TeamDetails />} />
        <Route path="/list/:tourneyId/details" element={<TourneyMain />} />
        <Route path="/list/:tourneyId/details/edit" element={<EditFormTourney />} />
        <Route path="/teams" element={<TeamList />} />
        <Route path="/tourney/create" element={<CreateTourneyForm />} />
        <Route path="/game/create" element={<CreateGameForm />} />
        <Route path="/team/create" element={<CreateTeamForm />} />
        <Route path="/profile/:userId/edit" element={<InfoEdit/>} />
   


        {/* Error Pages */}

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
