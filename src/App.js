// * Imports
// general
import { Route, Routes } from "react-router-dom";
import "./App.css";
import IsPrivate from "./components/IsPrivate";


// pages
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import TeamDetails from "./pages/TeamDetails";
import TourneyDetails from "./pages/TourneyDetails";


// components
import NavBar from "./components/NavBar";
import CreateGameForm from "./components/profile/CreateGameForm";
import CreateTeamForm from "./components/profile/CreateTeamForm";
import CreateTourneyForm from "./components/profile/CreateTourneyForm";
import InfoEdit from "./components/profile/InfoEdit";
import EditFormTourney from "./components/TourneyDetails/EditFormTourney";
import TeamList from "./components/profile/TeamList";



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
          <Route path="/team/:teamId/details" element={<TeamDetails />} />
        <Route path="/list/:tourneyId/details" element={<TourneyDetails />} />
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
