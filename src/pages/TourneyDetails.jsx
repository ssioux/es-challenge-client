import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { addTeamToTourneyService, detailsTourneyService, sortTeamsToTourneyService } from "../services/tourney.services";
import { useEffect, useState } from "react";



function TourneyDetails() {

  const navigate = useNavigate()
  const { tourneyId } = useParams();
  const [details, setDetails] = useState()
  // SAVE DISORDER LIST TO START THE TOURNAMENT
  // const [disorderList, setDisorderList] = useState()
  // console.log("disorderList[0]",disorderList[0].name)
  const [isFetching, setIsFetching] = useState(true)
  // const [isFetching2, setIsFetching2] = useState(false)
  console.log("details", details)

  const [quarterA1, setQuarterA1] = useState()
  const [quarterA2, setQuarterA2] = useState()
  const [quarterB1, setQuarterB1] = useState()
  const [quarterB2, setQuarterB2] = useState()

  const [quarterC1, setQuarterC1] = useState()
  const [quarterC2, setQuarterC2] = useState()
  const [quarterD1, setQuarterD1] = useState()
  const [quarterD2, setQuarterD2] = useState()
 


  useEffect(() => {
    getData()

  },[])

 
  
  const getData = async () => {
    try {
      const tourneyDetails = await detailsTourneyService(tourneyId)
      console.log("tourneyD",tourneyDetails.data)
   
      setIsFetching(false)
      setDetails(tourneyDetails.data)
     
      
 
    } catch (error) {
      navigate("/error")
    }
  }

  
  

  const handleAddTeamToTourney = async (e) => {
    e.preventDefault()
    try {
      await addTeamToTourneyService(tourneyId)
      // navigate(`/tourney/${tourneyId}/details`)
        
    } catch (error) {
      navigate("/error")
      
    }
  }

  const handleStartSort = async (e) => {
    e.preventDefault()
    try {
       
        await sortTeamsToTourneyService(tourneyId)
        console.log("entrando en estart")
        
        
        console.log("details despues de entrar", details)
        await detailsTourneyService(tourneyId)
      setQuarterA1(details.quarterA[0].name)
      setQuarterA2(details.quarterA[1].name)
      setQuarterB1(details.quarterB[0].name)
      setQuarterB2(details.quarterB[1].name)
      setQuarterC1(details.quarterC[0].name)
      setQuarterC2(details.quarterC[1].name)
      setQuarterD1(details.quarterD[0].name)
      setQuarterD2(details.quarterD[1].name)
      // setTimeout(()=>{
       
      // },2000)
      // console.log(response.data)
      // setDisorderList(response.data)
      
      
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

      <header className="hero">
        <div className="hero-wrap">
          <p className="intro" id="intro">
            Game Name
          </p>
          <h1 id="headline">Tournament</h1>
          <p className="year">
            <i className="fa fa-star"></i> TEMPORADA <i className="fa fa-star"></i>
          </p>
          <p>NOMBRE DEL TORNEO</p>
        </div>
      </header>

      <section id="bracket">
        <div className="container">
          <div className="split split-one">
            <div className="round round-one current">
              <div className="round-details">
                Round 1<br />
                <span className="date">March 16</span>
              </div>
              <ul className="matchup">
                <li className="team team-top">
                  {quarterA1}<span className="score">76</span>
                </li>
                <li className="team team-bottom">
                {quarterA2}<span className="score">82</span>
                </li>
              </ul>
              <ul className="matchup">
                <li className="team team-top">
                {quarterB1}<span className="score">64</span>
                </li>
                <li className="team team-bottom">
                {quarterB2}<span className="score">56</span>
                </li>
              </ul>
              
            </div>
            {/* <!-- END ROUND ONE --> */}

            <div className="round round-two">
              <div className="round-details">
                Round 2<br />
                <span className="date">March 18</span>
              </div>
              <ul className="matchup">
                <li className="team team-top">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
                <li className="team team-bottom">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
              </ul>
            
            </div>
           

        
          </div>
           {/* <!-- END ROUND TWO --> */}
          {/*  END ROUND THREE   */}
          <div className="champion">
            <div className="semis-l">
              <div className="round-details">
                west semifinals <br />
                <span className="date">March 26-28</span>
              </div>
              <ul className="matchup championship">
                <li className="team team-top">
                  &nbsp;<span className="vote-count">&nbsp;</span>
                </li>
                <li className="team team-bottom">
                  &nbsp;<span className="vote-count">&nbsp;</span>
                </li>
              </ul>
            </div>
            <div className="final">
              <i className="fa fa-trophy"></i>

              {/* // champion */}
              <div className="round-details">
                campeon <br />
                <span className="date">March 30 - Apr. 1</span>
              </div>
              
              <ul className="matchup championship">
                <li className="team team-top">
                  &nbsp;<span className="vote-count">&nbsp;</span> 
                </li>
              </ul>
            </div>
 
          </div>

          <div className="split split-two">
        
            {/* END ROUND THREE  */}

            <div className="round round-two">
              <div className="round-details">
                Round 2<br />
                <span className="date">March 18</span>
              </div>
              <ul className="matchup">
                <li className="team team-top">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
                <li className="team team-bottom">
                  &nbsp;<span className="score">&nbsp;</span>
                </li>
              </ul>
            
            </div>

            {/* END ROUND TWO  */}

            <div className="round round-one current">
              <div className="round-details">
                Round 1<br />
                <span className="date">March 16</span>
              </div>
              <ul className="matchup">
                <li className="team team-top">
                {quarterC1}<span className="score">45</span>
                </li>
                <li className="team team-bottom">
                {quarterC2}<span className="score">54</span>
                </li>
              </ul>
              <ul className="matchup">
                <li className="team team-top">
                {quarterD1}<span className="score">68</span>
                </li>
                <li className="team team-bottom">
                {quarterD2}<span className="score">66</span>
                </li>
              </ul>
              
            </div>
          </div>
        </div>
        {/* END ROUND ONE */}
      </section>
      <section className="share">
        <div className="share-wrap">
          <a className="share-icon" href="https://twitter.com/_joebeason">
            <i className="fa fa-twitter"></i>
          </a>
          <a className="share-icon" href="#">
            <i className="fa fa-facebook"></i>
          </a>
          <a className="share-icon" href="#">
            <i className="fa fa-envelope"></i>
          </a>
        </div>
      </section>
      <div>
        <h3>Team List</h3>
        {/* {details.teams.map((eachTeam) => {
          return(
            <p key={eachTeam._id}>{eachTeam.name}</p>
          )
        })} */}
      </div>

      <Button onClick={handleStartSort}>Start</Button>
      <Button>Edit</Button>
    
      <Button onClick={handleAddTeamToTourney}>signup Team</Button>
    </div>
    )
  }



export default TourneyDetails;
