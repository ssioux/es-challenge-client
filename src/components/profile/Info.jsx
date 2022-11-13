
import axios from "axios"
import { detailsUser, updateUser } from "../../services/profile.services"
import {  useNavigate, Link } from "react-router-dom"
import { useEffect, useState  } from 'react'
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context.js";
import InfoEdit from "./InfoEdit";



function Info() {
  
  const { user } = useContext(AuthContext);
  const{username, email, _id, picture} = user.user
console.log("user",user )
  

  return (
    <div>
        

        <h3>Hello {username}</h3>
        <img src={picture} alt="imageProfile" width={100} />
        <h4>email: {email}</h4>



        <Link to={`/profile/${_id}/edit`} >Edit User</Link>


        <Link to="/tourney/create" >Create Tourney</Link>  {/* admin */}

    </div>
  )
}

export default Info
