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

  // ! QUARTER STATES
  // * Quarter A
  const [quarterA1, setQuarterA1] = useState("Empty")
  const [scoreA1, setScoreA1] = useState(0)

  const [quarterA2, setQuarterA2] = useState("Empty")
  const [scoreA2, setScoreA2] = useState(0)

  // * Quarter B
  const [quarterB1, setQuarterB1] = useState("Empty")
  const [scoreB1, setScoreB1] = useState(0)

  const [quarterB2, setQuarterB2] = useState("Empty")
  const [scoreB2, setScoreB2] = useState(0)
  // * Quarter C
  const [quarterC1, setQuarterC1] = useState("Empty")
  const [scoreC1, setScoreC1] = useState(0)

  const [quarterC2, setQuarterC2] = useState("Empty")
  const [scoreC2, setScoreC2] = useState(0)

  // * Quarter D
  const [quarterD1, setQuarterD1] = useState("Empty")
  const [scoreD1, setScoreD1] = useState(0)

  const [quarterD2, setQuarterD2] = useState("Empty")
  const [scoreD2, setScoreD2] = useState(0)






  useEffect(() => {
    getData()
    
  },[])

 
  
  const getData = async () => {
    try {
      const response = await detailsTourneyService(tourneyId)
    
   

      const tourneyDetails = response.data
      
      setDetails(tourneyDetails)
      // EN DETAILS TIENEN TODA LA INFO DE LOS TIERS DEL TORNEO
      // NO HARIA FALTA ESTADOS PARA CADA UNO
     
       if (tourneyDetails.quarterA.length === 2) {
        setQuarterA1(tourneyDetails.quarterA[0].name)
        setQuarterA2(tourneyDetails.quarterA[1].name)
      //  } else if (tourneyDetails.quarterB.length === 2) {
        setQuarterB1(tourneyDetails.quarterB[0].name)
        setQuarterB2(tourneyDetails.quarterB[1].name)
      //  } else if (tourneyDetails.quarterC.length === 2) {
        setQuarterC1(tourneyDetails.quarterC[0].name)
        setQuarterC2(tourneyDetails.quarterC[1].name)
      // } else if (tourneyDetails.quarterD.length === 2) {
        setQuarterD1(tourneyDetails.quarterD[0].name)
        setQuarterD2(tourneyDetails.quarterD[1].name)
      }

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
      navigate(`/list/${tourneyId}/details`)
    } catch (error) {
      navigate("/error")
      
    }
  }

  const handleStartSort = async (e) => {
    e.preventDefault()
    try {
       
        const response = await sortTeamsToTourneyService(tourneyId)
        console.log("entrando en estart")
        
        // getData()
        console.log("RESPONSE", response.data[0].name)




        // CUANDO HAGAN EL SORT, ACTUALIZAN LOS DETALLES
        // KATA => TIENE UNA ESTRUCTURA DE DATA CON VARIOS ARRAYS
        // ACTUALIZAR CADA ARRAY CON LOS VALORES ABAJO
       setQuarterA1(response.data[0].name)
       setQuarterA2(response.data[1].name)
       setQuarterB1(response.data[2].name)
       setQuarterB2(response.data[3].name)
       setQuarterC1(response.data[4].name)
       setQuarterC2(response.data[5].name)
       setQuarterD1(response.data[6].name)
       setQuarterD2(response.data[7].name)

       
      //  setTimeout(()=>{
       
      // },2000)
      // console.log(response.data)
      // setDisorderList(response.data)
      
      navigate(`/list/${tourneyId}/details`)
    } catch (error) {
      navigate("/error")
    }
    
  }
  
  
  console.log(details)
  

  
  
  if (isFetching === true) {
    return (
      <h2>...Loading</h2>
      )
    }
    
     const handleEditLink = (e) => {
      
      navigate(`/list/${tourneyId}/details/edit`)
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
                {quarterA1}<span className="score">{scoreA1}</span>
                </li>
                <li className="team team-bottom">
                {quarterA2}<span className="score">{scoreA2}</span>
                </li>
              </ul>
              <ul className="matchup">
                <li className="team team-top">
                {quarterB1}<span className="score">{scoreB1}</span>
                </li>
                <li className="team team-bottom">
                {quarterB2}<span className="score">{scoreB2}</span>
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
                {quarterC1}<span className="score">{scoreC1}</span>
                </li>
                <li className="team team-bottom">
                {quarterC2}<span className="score">{scoreC2}</span>
                </li>
              </ul>
              <ul className="matchup">
                <li className="team team-top">
                {quarterD1}<span className="score">{scoreD1}</span>
                </li>
                <li className="team team-bottom">
                {quarterD2}<span className="score">{scoreD2}</span>
                </li>
              </ul>
              
            </div>
          </div>
        </div>
        {/* END ROUND ONE */}
      </section>
      {/* <section className="share">
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
      </section> */}
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
      <Button onClick={handleEditLink}>Edit Tourney</Button>
    </div>
    )
  }



export default TourneyDetails;
