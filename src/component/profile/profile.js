import React, { useContext } from 'react'
import AuthContext from '../../context/AuthProvider'
import { Link } from 'react-router-dom'

function Profile() {
  const auth = useContext(AuthContext)

  // Logout function
  const signout = () =>{
  auth.setAuth(null)
}


  

  return (
    <>
      {auth.auth ? 
        <div>
          Profile page <br/>
          <button onClick={signout}>Logout</button>
        </div>
      :

      <div>
        You are not authenticated!!!  <br />
        Go to <Link to="/homepage">homepage</Link>!!! 

      </div>
    } 
    </>
  )
}

export default Profile
