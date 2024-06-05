import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import { useCreateUserMutation } from "../../services/userServices"; // Ensure this path is correct
import "./signup.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PatientSignup = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  // Creating UseState
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createPatient, { isLoading, error, data }] = useCreateUserMutation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      username: userName,
      password: password,
      email: userEmail,
      user_type: "Pt",
    };
    try {
      const response = await createPatient(data).unwrap();
      dispatch({ type: "auth/setToken" });
      console.log("Patient created successfully:", response);
    } catch (err) {
      console.error("Failed to register patient: ", err);
      toast.error(err.data?.detail || "An error occurred");
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <ToastContainer />
      <div className="main">
        <div className="wrapper">
          <div className="title-text">
            <div className="title signup">
              <h3>Patient SignUp</h3>
            </div>
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
                    type="password" // Change to password type
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </div>
                {/* Submit Button */}
                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Signup" disabled={isLoading} />
                </div>
              </form>
            </div>
          </div>
          <span className="small-text center no-padding">
            Already have account? <Link to="/login/patient">Login Here</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default PatientSignup;
