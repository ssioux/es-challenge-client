
import { useContext, useEffect, useState } from "react"
import { addMemberTeamService, detailsTeamService } from "../services/team.services"
import { useNavigate, useParams } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../context/auth.context";





function TeamDetails() {
  const { isLoggedIn, user } = useContext(AuthContext);
  console.log("user",user)

  const {teamId} = useParams()

  const navigate = useNavigate()

  const [teamDetails, setTeamDetails] = useState()
  const [isFetching, setIsFetching] = useState(true)
  const [passToggle, setPassToggle] = useState(false)
  const [passwordInput, setPasswordInput] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  

  useEffect(() => {
    
    getData()
    
  }, [])
  
  const getData = async () => {
    try {
        const details = await detailsTeamService(teamId)
        console.log("🚀 ~ file: TeamDetails.jsx:41 ~ getData ~ details", details)
      
        setTeamDetails(details.data)
        setIsFetching(false)
    } catch (error) {
        navigate("/error")
    }
}
if (isFetching === true) {
  return (
      <h3>...Loading</h3>
      
  )
}

  const handleJoinTeam = async(e) => {
 
    setPassToggle(true)
    

  }

  const handlePasswordChange = (e) => {
    e.preventDefault()

   setPasswordInput(e.target.value)
  }

  const handlAcceptTeam = async(e) => {
    e.preventDefault()
   
    setPassToggle(false)
    
    const pass = {password:passwordInput}
    try {
     await addMemberTeamService(teamId,pass)
      getData()
      setErrorMessage("")
      setPasswordInput("")
    } catch (error) {
      if(error.response.status === 400){
        setErrorMessage(error.response.data.errorMessage)
        setPasswordInput("")
      }else{
        navigate("/error")
      }
    }
  }
  return (
    <div>
        <h3>team details</h3>
        <Card  style={{ margin:"auto",width: '20rem', marginBotton: "20px", opacity:"0.7"}}>
      <Card.Img variant="top" src={teamDetails.picture} />
      <Card.Body>
        <Card.Title>{teamDetails.name}</Card.Title>
        <Card.Text>
          Members:
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
      {teamDetails.members.map((eachMember) => {
        return (
        <ListGroup.Item key={eachMember._id}>{teamDetails.nameTag} - {eachMember.username}</ListGroup.Item>
        ); 
      })}
     </ListGroup>
     {teamDetails?.members.filter((eachMember) => {
      return eachMember?._id === user?.user?._id
     })[0]?._id === user?.user?.id && isLoggedIn ? (

      <Button type="submit" variant="outline-secondary" id="button-addon3" onClick={handleJoinTeam}>
        Join Team
        </Button>
     ):(
      <Button type="submit" variant="outline-secondary" id="button-addon3" onClick={handleJoinTeam}>
        Remove from Team
        </Button>
     )}
     
     
        {passToggle &&  
        <InputGroup className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={passwordInput}
            onChange={handlePasswordChange}
          />
          <Button type="submit" variant="outline-secondary" id="button-addon3" onClick={handlAcceptTeam}>
            Accept
          </Button>
        </InputGroup> }
        
          {errorMessage !== "" && <p className="error-message">{errorMessage}</p>}
    </Card>
     
       
     

{/* 
        <img src={teamDetails.picture} alt="shield" />
        <h3>{teamDetails.name}</h3>
        <ul>
        {teamDetails.members.map((eachMem)=> {
          return (
            <li key={eachMem._id}>{teamDetails.nameTag}-{eachMem.username}</li>
          )
        })}
        </ul> */}
      
    </div>
  )
}

export default TeamDetails





