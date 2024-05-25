import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'


function Homepage() {
  const auth = useContext(AuthContext);

  const signout = () =>{
    auth.setAuth(null)
  }

  return (
    <div>
      HomePage: { auth.auth ? 
      <div>
        <button onClick={signout}> Sign Out</button> 
        Welcome: {auth.auth["email"]}
      </div>
      
      : 
      
      <></> }<br />
      <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>

      </ul>
    </div>
  )
}

export default Homepage
