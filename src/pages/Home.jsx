import TourneyFinishedList from "../components/home/TourneyFinishedList"
import TourneyList from "../components/home/TourneyList"
import TeamList from "../components/profile/TeamList"


function Home() {
  return (
    <div>
        <h1>Home</h1>
        
        
        
      
        
        
        
        
        
        
        <div>
        <TourneyList />
        {/* <TourneyFinishedList /> */}
        </div>
        
        
        
        
        
        
        <div>
        <TeamList/>
        </div>

    </div>

  )
}

export default Home