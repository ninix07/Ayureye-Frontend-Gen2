import React, { useEffect, useState } from "react";
import gLogo from "../../image/gLogo.png";
import "./login.css";
import { useHistory } from "react-router-dom";
import { useLoginUserMutation } from "../../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function DoctorLogin() {
  const navigate = useHistory();
  const dispatch = useDispatch();
  const [loginUser, { isLoading, error, data }] = useLoginUserMutation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // State Variable
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loggedin, setLoggedIn] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate.push("/");
    }
  }, [isAuthenticated]);

  // Handling request error
  const [errMsg, setErrMsg] = useState("");

  const login = async () => {
    const data = {
      password: userPassword,
      username: userName,
    };
    try {
      const response = await loginUser(data).unwrap();
      const token = response.token;
      dispatch({ type: "auth/setToken", payload: token });
    } catch (err) {
      console.error("Failed to login doctor: ", err);
      toast.error(err.data?.detail || "An error occurred");
    }
  };

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
      <ToastContainer />
      <div class="wrapper">
        <p class={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <div class="title-text">
          <div class="title login">DoctorLogin</div>
        </div>
        <div class="form-container glogo-box">
          <img src={gLogo} alt="google logo" />
          <span class="center glogo-text">Continue with Google</span>
        </div>
        <div class="form-container">
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
                <a href="#">Forgot Password</a>
              </div>
              <div class="signup-link">
                Not a member?{" "}
                <a
                  href="/signup/doctor"
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

export default DoctorLogin;
