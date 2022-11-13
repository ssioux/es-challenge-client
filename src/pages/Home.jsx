import TourneyFinishedList from "../components/home/TourneyFinishedList"
import TourneyList from "../components/home/TourneyList"


function Home() {
  return (
    <div>
        <h1>Home</h1>
        
        <TourneyList />
        <TourneyFinishedList />

    </div>
  )
}

export default Home