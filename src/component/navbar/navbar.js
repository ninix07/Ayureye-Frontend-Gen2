import React, { useContext } from 'react'
import logo from '../../image/AyurEye.png'
import './navbar.css'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'
import { logout } from '../../utils/logout'
import { useCookies } from 'react-cookie';
import { cookieArray } from '../../utils/cookies'


function Navbar() {
  const auth = useContext(AuthContext);
  const [, , removeCookie] = useCookies(cookieArray);
  console.log(auth);

  const signout = async () => {
    await logout(auth, removeCookie);
  }


  return (
    <header>
      <img src={logo} alt="logo" />
      {/* <img src="./AyurEye.png"/> */}
      <nav className="navbar">
        <ul className="navbar_ul">
          {/* Endpoint to route to Home component */}
          <li className="listitem"><Link to="/homepage">Home</Link></li>
          <li className="listitem"><Link to="#">About</Link></li>
          <li className="listitem"><Link to="#">Contact Us</Link></li>
          {/* <li className="listitem"><Link to="#">Signup</Link></li> */}
          {auth.auth ?
            <>
              <li className="listitem"><Link to="/dashboard">DashBoard</Link></li>
              <li><button className="signout-button" onClick={signout}>SignOut</button></li>
            </>
            :
            <li className="listitem dropdown">Login
              <div className="dropdown-content">
                <Link to="/login/doctor">As Doctor</Link>
                <Link to="/login/patient">As Patient</Link>
              </div>
            </li>

          }

        </ul>
      </nav>
    </header>
  )
}

export default Navbar
