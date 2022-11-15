import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { addTeamToTourneyService, detailsTourneyService, sortTeamsToTourneyService } from "../services/tourney.services";
import { useEffect, useState } from "react";



function TourneyDetails() {

  const navigate = useNavigate()
  const { tourneyId } = useParams();
  const [details, setDetails] = useState()
  // SAVE DISORDER LIST TO START THE TOURNAMENT
  const [disorderList, setDisorderList] = useState()
  // console.log("disorderList[0]",disorderList[0].name)
  const [isFetching, setIsFetching] = useState(true)
  console.log("details", details)

  useEffect(() => {
    getData()

  },[])
  
  
  const getData = async () => {
    try {
      const tourneyDetails = await detailsTourneyService(tourneyId)
      console.log("tourneyD",tourneyDetails)
      setDetails(tourneyDetails.data)
      setIsFetching(false)
      
    } catch (error) {
      navigate("/error")
    }
  }

  
  

  const handleAddTeamToTourney = async (e) => {
    e.preventDefault()
    try {
      await addTeamToTourneyService(tourneyId)
      // navigate(`/tourney/${tourneyId}/details`)
      getData()
    } catch (error) {
      navigate("/error")
      
    }
  }

  const handleStartSort = async (e) => {
    e.preventDefault()
    try {
      const response = await sortTeamsToTourneyService(tourneyId)
      console.log(response.data)
      setDisorderList(response.data)
      
    } catch (error) {
      navigate("/error")
    }


  }

  if (isFetching === true) {
    return (
      <h2>...Loading</h2>
    )
  }

  return (
<div className="tourney-list">
      <h3>TourneyDetails</h3>

      <header class="hero">
        <div class="hero-wrap">
          <p class="intro" id="intro">
            Game Name
          </p>
          <h1 id="headline">Tournament</h1>
          <p class="year">
            <i class="fa fa-star"></i> TEMPORADA <i class="fa fa-star"></i>
          </p>
          <p>NOMBRE DEL TORNEO</p>
        </div>
      </header>

      <section id="bracket">
        <div class="container">
          <div class="split split-one">
            <div class="round round-one current">
              <div class="round-details">
                Round 1<br />
                <span class="date">March 16</span>
              </div>
              <ul class="matchup">
                <li class="team team-top">
                  {disorderList[0].name}<span class="score">76</span>
                </li>
                <li class="team team-bottom">
                {disorderList[1].name}<span class="score">82</span>
                </li>
              </ul>
              <ul class="matchup">
                <li class="team team-top">
                {disorderList[2].name}<span class="score">64</span>
                </li>
                <li class="team team-bottom">
                {disorderList[3].name}<span class="score">56</span>
                </li>
              </ul>
              
            </div>
            {/* <!-- END ROUND ONE --> */}

            <div class="round round-two">
              <div class="round-details">
                Round 2<br />
                <span class="date">March 18</span>
              </div>
              <ul class="matchup">
                <li class="team team-top">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
                <li class="team team-bottom">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
              </ul>
            
            </div>
           

        
          </div>
           {/* <!-- END ROUND TWO --> */}
          {/*  END ROUND THREE   */}
          <div class="champion">
            <div class="semis-l">
              <div class="round-details">
                west semifinals <br />
                <span class="date">March 26-28</span>
              </div>
              <ul class="matchup championship">
                <li class="team team-top">
                  &nbsp;<span class="vote-count">&nbsp;</span>
                </li>
                <li class="team team-bottom">
                  &nbsp;<span class="vote-count">&nbsp;</span>
                </li>
              </ul>
            </div>
            <div class="final">
              <i class="fa fa-trophy"></i>

              {/* // champion */}
              <div class="round-details">
                campeon <br />
                <span class="date">March 30 - Apr. 1</span>
              </div>
              
              <ul class="matchup championship">
                <li class="team team-top">
                  &nbsp;<span class="vote-count">&nbsp;</span> 
                </li>
              </ul>
            </div>
 
          </div>

          <div class="split split-two">
        
            {/* END ROUND THREE  */}

            <div class="round round-two">
              <div class="round-details">
                Round 2<br />
                <span class="date">March 18</span>
              </div>
              <ul class="matchup">
                <li class="team team-top">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
                <li class="team team-bottom">
                  &nbsp;<span class="score">&nbsp;</span>
                </li>
              </ul>
            
            </div>

            {/* END ROUND TWO  */}

            <div class="round round-one current">
              <div class="round-details">
                Round 1<br />
                <span class="date">March 16</span>
              </div>
              <ul class="matchup">
                <li class="team team-top">
                {disorderList[4].name}<span class="score">45</span>
                </li>
                <li class="team team-bottom">
                {disorderList[5].name}<span class="score">54</span>
                </li>
              </ul>
              <ul class="matchup">
                <li class="team team-top">
                {disorderList[6].name}<span class="score">68</span>
                </li>
                <li class="team team-bottom">
                {disorderList[7].name}<span class="score">66</span>
                </li>
              </ul>
              
            </div>
          </div>
        </div>
        {/* END ROUND ONE */}
      </section>
      <section class="share">
        <div class="share-wrap">
          <a class="share-icon" href="https://twitter.com/_joebeason">
            <i class="fa fa-twitter"></i>
          </a>
          <a class="share-icon" href="#">
            <i class="fa fa-facebook"></i>
          </a>
          <a class="share-icon" href="#">
            <i class="fa fa-envelope"></i>
          </a>
        </div>
      </section>
      <div>
        <h3>Team List</h3>
        {details.teams.map((eachTeam) => {
          return(
            <p key={eachTeam._id}>{eachTeam.name}</p>
          )
        })}
      </div>

      <Button onClick={handleStartSort}>Start</Button>
      <Button>Edit</Button>
    
      <Button onClick={handleAddTeamToTourney}>signup Team</Button>
    </div>
    )
  }



export default TourneyDetails;
