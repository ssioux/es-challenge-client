import TourneyFinishedList from "../components/home/TourneyFinishedList"
import TourneyList from "../components/home/TourneyList"
import TeamList from "../components/profile/TeamList"


function Home() {
  return (
    <div style={{display:"flex",margin:"auto", width:"80%", justifyContent:"space-between"}}>
        
        
        
        
      
        
        
        
        
        
        
        <div>
        <TourneyList />
        {/* <TourneyFinishedList /> */}
        </div>
        
        
        <br />
        
        
        
        <div>
        <TeamList/>
        </div>

    </div>

  )
}

export default Home