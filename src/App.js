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
import TourneyMain from "./components/Tourney/TourneyMain.jsx";
import About from "./pages/navbar/About";
import Footer from "./components/Footer";




function App() {

  return (
    <div className="App"> 
    
      <NavBar />
   
      <Routes>
        {/*  ********* Auth Pages ********/}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <Profile />
            </IsPrivate>
          }
        />
        <Route path="/profile/:userId/edit" element={<InfoEdit />} />

        {/*  ********* Tourney Pages ********/}
        <Route path="/tourneys" element={<TourneyList />} />
        <Route path="/list/:tourneyId/details" element={<TourneyMain />} />
        <Route
          path="/list/:tourneyId/details/edit"
          element={<EditFormTourney />}
        />
        <Route path="/tourney/create" element={<CreateTourneyForm />} />
        {/*  ********* Team Pages ********/}
        <Route path="/team/:teamId/details" element={<TeamDetails />} />
        <Route path="/team/create" element={<CreateTeamForm />} />
        <Route path="/teams" element={<TeamList />} />
        {/*  ********* Game Pages ********/}
        <Route path="/game/create" element={<CreateGameForm />} />
        {/*  ********* About Pages ********/}
        <Route path="/about" element={<About />} />
        
        {/* Error Pages */}

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
