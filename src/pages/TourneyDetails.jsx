import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

function TourneyDetails() {
  const { tourneyId } = useParams();


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
                  Duke<span class="score">76</span>
                </li>
                <li class="team team-bottom">
                  Virginia<span class="score">82</span>
                </li>
              </ul>
              <ul class="matchup">
                <li class="team team-top">
                  Wake Forest<span class="score">64</span>
                </li>
                <li class="team team-bottom">
                  Clemson<span class="score">56</span>
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
                  Minnesota<span class="score">45</span>
                </li>
                <li class="team team-bottom">
                  Northwestern<span class="score">54</span>
                </li>
              </ul>
              <ul class="matchup">
                <li class="team team-top">
                  Michigan<span class="score">68</span>
                </li>
                <li class="team team-bottom">
                  Iowa<span class="score">66</span>
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

      <Button>Start</Button>
      <Button>Edit</Button>
      <Button>signup Team</Button>
    </div>
  );
}

export default TourneyDetails;
