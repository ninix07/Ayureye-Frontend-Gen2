import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../context/AuthProvider'
import gLogo from '../../image/gLogo.png'
import './login.css'
import { signin } from '../../utils/login';
import { useCookies } from 'react-cookie';
import { logout } from '../../utils/logout'
import { cookieArray } from '../../utils/cookies'
import { useHistory } from 'react-router-dom';


function DoctorLogin() {
  const navigate = useHistory();
  const [, setCookie, removeCookie] = useCookies(cookieArray);
  const auth = useContext(AuthContext);

  // State Variable
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loggedin, setLoggedIn] = useState(false);
  useEffect(() => {
    if (auth.auth) {
      console.log(auth);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [auth])

  // Handling request error
  const [errMsg, setErrMsg] = useState('');

  const login = async () => {
    const data = await signin(userEmail, userPassword, auth, setCookie);
    console.log(data);
    setLoggedIn(data !== null);
    if (data == null) {
      setErrMsg("username or password incorrect");
    } else if (data['user_type'] !== 'Dr') {
      logout(auth, removeCookie);
      setLoggedIn(false);
      setErrMsg("You are not authorized to login as a doctor");
    }
    navigate.push('/dashboard');
  }

  // Logout function
  const signout = () => {
    logout(auth, removeCookie);
    setLoggedIn(false);
  }

  // Form Submit handle function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      login();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {
        loggedin ?
          <div>
            <div>Yes you are logged in</div>
            <button onClick={signout}> Sign Out</button><br />
            <Link to="/homepage">Homepage</Link>
          </div>
          :
          <div class="wrapper">
            <p class={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <div class="title-text">
              <div class="title login">
                DoctorLogin
              </div>
            </div>
            <div class="form-container glogo-box">
              <img src={gLogo} alt="google logo" />
              <span class="center glogo-text">Continue with Google</span>
            </div>
            <div class="form-container">
              <div class="slide-controls">
                <input type="radio" name="slide" id="login" checked />
                <label for="login" class="slide login">Login</label>

                <input type="radio" name="slide" id="signup" />
                <label for="signup" class="slide signup"><a href="/signup/doctor" style={{ textDecoration: "none", color: "black" }}>Signup</a></label>

                <div class="slider-tab"></div>
              </div>
              <div class="form-inner">
                <form onSubmit={handleSubmit} class="login">
                  <div class="field">
                    {/* <input 
                            type="text" 
                            placeholder="Email" 
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e)=> setUser(e.target.value)}
                            required />  */}
                    <input
                      type="text"
                      placeholder="Email"
                      id="username"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      autoComplete="off"
                      required />
                  </div>
                  <div class="field">
                    {/* <input type="password" 
                            id="password"
                            placeholder="Password" 
                            onChange={(e)=>setPwd(e.target.value)}
                            value={pwd}
                            required />  */}
                    <input type="password"
                      id="password"
                      placeholder="Password"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      required />
                  </div>
                  <div class="field btn">
                    <div class="btn-layer"></div>
                    <input type="submit" value="Login" />
                  </div>
                  <div class="pass-link">
                    <a href="#">Forgot Password</a>
                  </div>
                  <div class="signup-link">
                    Not a member?  <a href="/signup/doctor" style={{ textDecoration: "none", color: "#fa4299" }}>Signup now</a>
                  </div>
                </form>
              </div>
            </div>
          </div>

      }
    </>
  )
}

export default DoctorLogin
