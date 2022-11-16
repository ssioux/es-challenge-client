import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Form ,useParams, useNavigate} from 'react-router-dom'



function EditFormTourney() {
  const {tourneyId} = useParams()
  const navigate = useNavigate()

  const [resultQ1Input, setResultQ1Input] = useState()
  const [resultQ2Input, setResultQ2Input] = useState()
  const [resultQ3Input, setResultQ3Input] = useState()
  const [resultQ4Input, setResultQ4Input] = useState()
  const [resultQ5Input, setResultQ5Input] = useState()
  const [resultQ6Input, setResultQ6Input] = useState()
  const [resultQ7Input, setResultQ7Input] = useState()
  const [resultQ8Input, setResultQ8Input] = useState()
  const [resultS1Input, setResultS1Input] = useState()
  const [resultS2Input, setResultS2Input] = useState()
  const [resultS3Input, setResultS3Input] = useState()
  const [resultS4Input, setResultS4Input] = useState()
  const [resultF1Input, setResultF1Input] = useState()
  const [resultF2Input, setResultF2Input] = useState()
  const [winner , setWinner] = useState()

  const [isFetching, setIsFetching] = useState(true)

  


const handleResultQ1 = (e) => setResultQ1Input(e.target.value)
const handleResultQ2 = (e) => setResultQ2Input(e.target.value)
const handleResultQ3 = (e) => setResultQ3Input(e.target.value)
const handleResultQ4 = (e) => setResultQ4Input(e.target.value)
const handleResultQ5 = (e) => setResultQ5Input(e.target.value)
const handleResultQ6 = (e) => setResultQ6Input(e.target.value)
const handleResultQ7 = (e) => setResultQ7Input(e.target.value)
const handleResultQ8 = (e) => setResultQ8Input(e.target.value)
const handleResultS1 = (e) => setResultS1Input(e.target.value)
const handleResultS2 = (e) => setResultS2Input(e.target.value)
const handleResultS3 = (e) => setResultS3Input(e.target.value)
const handleResultS4 = (e) => setResultS4Input(e.target.value)
const handleResultF1 = (e) => setResultF1Input(e.target.value)
const handleResultF2 = (e) => setResultF2Input(e.target.value)

const handleUpdtateQuarters = async() => {
  try {
    await updateQuartersService(tourneyId)
    
  } catch (error) {
    navigate("/error")
  }

}
const handleUpdtateSemiFinals = async() => {
  try {
    await updateSemiFinalsService(tourneyId)
    
  } catch (error) {
    navigate("/error")
  }

}
const handleUpdateFinal = async() => {
  try {
    await updateFinalService(tourneyId)
    
  } catch (error) {
    navigate("/error")
  }

}

if(isFetching === true) {
  <h3>...Loading</h3>
}

  return (
    <div>
           <h1>Edit Tourney</h1>
        <hr />
           <Form style={{display:"flex"}}>
      <fieldset >
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="Q1">Q1</Form.Label>
          <Form.Control value={resultQ1Input} onChange={handleResultQ1} id="disabledTextInput" placeholder="Q1" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="Q2">Q2</Form.Label>
          <Form.Control value={resultQ2Input} onChange={handleResultQ2} id="disabledTextInput" placeholder="Q2" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="Q3">Q3</Form.Label>
          <Form.Control value={resultQ3Input} onChange={handleResultQ3} id="disabledTextInput" placeholder="Q3" />
        </Form.Group><Form.Group className="mb-3" >
          <Form.Label htmlFor="Q4">Q4</Form.Label>
          <Form.Control value={resultQ4Input} onChange={handleResultQ4} id="disabledTextInput" placeholder="Q4" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="Q5">Q5</Form.Label>
          <Form.Control value={resultQ5Input} onChange={handleResultQ5} id="disabledTextInput" placeholder="Q5" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="Q6">Q6</Form.Label>
          <Form.Control value={resultQ6Input} onChange={handleResultQ6} id="disabledTextInput" placeholder="Q6" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="Q7">Q7</Form.Label>
          <Form.Control value={resultQ7Input} onChange={handleResultQ7} id="disabledTextInput" placeholder="Q7" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="Q8">Q8</Form.Label>
          <Form.Control value={resultQ8Input} onChange={handleResultQ8} id="disabledTextInput" placeholder="Q8" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="S1">S1</Form.Label>
          <Form.Control value={resultS1Input} onChange={handleResultS1} id="disabledTextInput" placeholder="S1" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="S2">S2</Form.Label>
          <Form.Control value={resultS2Input} onChange={handleResultS2} id="disabledTextInput" placeholder="S2" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="S3">S3</Form.Label>
          <Form.Control value={resultS3Input} onChange={handleResultS3} id="disabledTextInput" placeholder="S3" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="S4">S4</Form.Label>
          <Form.Control value={resultS4Input} onChange={handleResultS4} id="disabledTextInput" placeholder="S4" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="F1">F1</Form.Label>
          <Form.Control value={resultF1Input} onChange={handleResultF1} id="disabledTextInput" placeholder="F1" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label htmlFor="F2">F2</Form.Label>
          <Form.Control value={resultF2Input} onChange={handleResultF2} id="disabledTextInput" placeholder="F2" />
        </Form.Group>
       
          
                
        
       
        <Button type="submit" onClick={handleUpdtateQuarters}>Create your Team</Button>
        <Button type="submit" onClick={handleUpdtateSemiFinals}>Create your Team</Button>
        <Button type="submit" onClick={handleUpdateFinal}>Create your Team</Button>
      </fieldset>
    </Form>
    </div>
  )
}

export default EditFormTourney