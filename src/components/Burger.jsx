import React,{useState}  from 'react'

function Burger() {
    const [open, setOpen] = useState(false)
  return (
    <div className='burger' open={open} onClick={() => setOpen(!open)}>
      <div id='one' />
      <div id='two'/>
      <div id='three'/>
    </div>
  )
}

export default Burger