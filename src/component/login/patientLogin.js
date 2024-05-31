import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import gLogo from "../../image/gLogo.png";
import "./login.css";
import { signin } from "../../utils/login";
import { useCookies } from "react-cookie";
import { cookieArray } from "../../utils/cookies";
import { logout } from "../../utils/logout";
import { useHistory } from "react-router-dom";
import { useLoginUserMutation } from "../../services/userServices";
import { useDispatch, useSelector } from "react-redux";
function PatientLogin() {
  const history = useHistory();
  const dispatch = useDispatch();

  // State Variable
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginPatient, { isLoading, error, data }] = useLoginUserMutation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // Handling request error
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated]);

  //Login and logout function
  const login = async (e) => {
    const data = {
      password: userPassword,
      username: userName,
    };
    try {
      const response = await loginPatient(data).unwrap();
      dispatch({ type: "auth/setToken" });
      console.log("Patient logged successfully:", response);
      console.log(isAuthenticated);
      console.log(response);
    } catch (err) {
      console.error("Failed to login patient: ", err);
      setErrMsg(err.message);
    }
  };

  // Logout function
  // const signout = () => {};

  // Form Submit handle function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      login();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/*  Login form code */}
      <div class="wrapper">
        {/* <p ref={errRef} class={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>  */}
        <div class="title-text">
          <div class="title login">Patient Login</div>
        </div>
        <div class="form-container glogo-box">
          <img src={gLogo} alt="logo" />
          <span class="center glogo-text">Continue with Google</span>
        </div>
        <div class="form-container">
          {/* <div class="slide-controls">
                <input type="radio" name="slide" id="login" checked />
                <label for="login" class="slide login">Login</label>
                
                    <input type="radio" name="slide" id="signup"/>
                    <label for="signup" class="slide signup"><a href="/signup/doctor" style={{textDecoration: "none", color: "black"}}>Signup</a></label>
                
                <div class="login-slider-tab"></div>
            </div> */}
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
                  placeholder="Username"
                  id="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>
              <div class="field">
                {/* <input type="password" 
                            id="password"
                            placeholder="Password" 
                            onChange={(e)=>setPwd(e.target.value)}
                            value={pwd}
                            required />  */}
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  required
                />
              </div>
              <div class="field btn">
                <div class="btn-layer"></div>
                <input type="submit" value="Login" />
              </div>
              <div class="pass-link">
                {/* <a href="#">Forgot Password</a> */}
              </div>
              <div class="signup-link">
                Not a member?{" "}
                <a
                  href="/signup/patient"
                  style={{ textDecoration: "none", color: "#fa4299" }}
                >
                  Signup now
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientLogin;
