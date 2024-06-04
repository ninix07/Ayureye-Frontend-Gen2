import React, { useContext } from "react";
import logo from "../../image/AyurEye.png";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userApi } from "../../services/userServices";
function Navbar() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const signout = async () => {
    console.log(user_type);
    localStorage.removeItem("token");
    dispatch({ type: "auth/logout" });
  };

  const user_type = useSelector(
    (state) =>
      state[userApi.reducerPath].queries["reloadUser(undefined)"]?.data
        ?.user_type
  );
  return (
    <header>
      <img src={logo} alt="logo" />
      {/* <img src="./AyurEye.png"/> */}
      <nav className="navbar">
        <ul className="navbar_ul">
          {/* Endpoint to route to Home component */}
          <li className="listitem">
            <Link to="/homepage">Home</Link>
          </li>
          <li className="listitem">
            <Link to="#">About</Link>
          </li>
          <li className="listitem">
            <Link to="#">Contact Us</Link>
          </li>
          {/* <li className="listitem"><Link to="#">Signup</Link></li> */}
          {auth ? (
            <>
              <li className="listitem">
                <Link to="/dashboard">DashBoard</Link>
              </li>
              <li className="listitem">
                <Link to="/upload">Image Upload</Link>
              </li>
              <li>
                <button className="signout-button" onClick={signout}>
                  SignOut
                </button>
              </li>
            </>
          ) : (
            <li className="listitem dropdown">
              Login
              <div className="dropdown-content">
                <Link to="/login/doctor">As Doctor</Link>
                <Link to="/login/patient">As Patient</Link>
              </div>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
