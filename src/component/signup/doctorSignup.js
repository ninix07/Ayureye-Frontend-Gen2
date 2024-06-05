import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import axios from "../../api/axios";
import { useCreateUserMutation } from "../../services/userServices";
import "./signup.css";
import { useDispatch, useSelector } from "react-redux";
import gLogo from "../../image/gLogo.png";
import uploadPic from "../../image/upload.png";
import DropUploadLicense from "../dropfile/dropUploadLicense";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const REGISTER_URL = "api/register/";

function DoctorSignup() {
  const [createdAccount, setCreatedAccount] = useState(false);
  const dispatch = useDispatch();
  const navigate = useHistory();
  // Creating UseState
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  //redux
  const [createPatient, { isLoading, error, data }] = useCreateUserMutation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // Handling request error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      username: userName,
      password: password,
      email: userEmail,
      address: address,
      contact: contact,
      licenseNumber: licenseNumber,
      user_type: "Dr",
    };
    try {
      const response = await createPatient(data).unwrap();
      const token = response.token;
      console.log("Doctor created successfully:", response);
      console.log(response);
      dispatch({ type: "auth/setToken", payload: token });
    } catch (err) {
      console.error("Failed to register doctor: ", err);
      toast.error(err.data?.detail || "An Error Occured");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      window.location.reload();
      navigate.push("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <ToastContainer />
      <div className="main">
        <div className="wrapper">
          <div className="title-text">
            <div className="title signup">
              <h3>Doctor SignUp</h3>
            </div>
          </div>
          <div className="form-container glogo-box">
            <img src={gLogo} alt="google logo" />
            <span className="center glogo-text">Continue with Google</span>
          </div>
          <div className="form-container">
            <div className="form-inner">
              <form onSubmit={handleSubmit} className="signup">
                <div className="field">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    placeholder="*Middle Name"
                    value={middleName}
                    onChange={(e) => {
                      setMiddleName(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    placeholder="Email Address"
                    value={userEmail}
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="field">
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="field">
                  <input
                    type="number"
                    placeholder="Contact Number"
                    value={contact}
                    onChange={(e) => {
                      setContact(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="field">
                  <input
                    type="number"
                    placeholder="License Number"
                    value={licenseNumber}
                    onChange={(e) => {
                      setLicenseNumber(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="field">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="field">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={matchPassword}
                    onChange={(e) => {
                      setMatchPassword(e.target.value);
                    }}
                    required
                  />
                </div>

                {/* Dynamic Upload License */}
                {/* <DropUploadLicense /> */}
                {/* Static Upload License */}
                {/* <div className="license-dropfile">
                        <img src={uploadPic} />
                        <span>Upload License</span>
                     </div>
                  */}

                {/* Submit Button */}
                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Signup" />
                </div>
              </form>
            </div>
          </div>
          <span className="small-text center no-padding">
            Already have account? <Link to="/login/doctor">Login Here</Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default DoctorSignup;
