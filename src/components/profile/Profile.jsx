import { useContext } from "react";
import { AuthContext } from "../../context/auth.context.js";

function Profile() {
    const { user } = useContext(AuthContext);
    const{username, picture} = user.user


  return (
    <div>
        <img src={picture} style={{borderRadius: 20}}alt="imgProfile" width={100} />
        <h5>Hi: {username}</h5>
    </div>
  )
}

export default Profile