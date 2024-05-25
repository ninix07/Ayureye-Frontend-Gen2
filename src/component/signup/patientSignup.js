import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import { useCreatePatientMutation } from "../../services/patientServices"; // Ensure this path is correct
import "./signup.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const PatientSignup = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  // Creating UseState
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createPatient, { isLoading, error, data }] =
    useCreatePatientMutation();
  const auth1 = useSelector((state) => state.auth);
  const [errMsg, setErrMsg] = useState("");
  const [patientCreated, setPatientCreated] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      username: userName,
      password: password,
      email: userEmail,
    };
    try {
      const response = await createPatient(data).unwrap();
      const token = response.token; // Extract token from the response
      dispatch({ type: "auth/setToken", payload: token }); // Dispatch an action to store the token
      console.log("Patient created successfully:", response);
      console.log(response);
      setPatientCreated(true);
    } catch (err) {
      console.error("Failed to register patient: ", err);
      setErrMsg(err.message);
    }
  };
  useEffect(() => {
    if (auth1) {
      history.push("/");
    }
  }, [auth1]);

  return (
    <>
      <div className="wrapper">
        <div className="title-text">
          <div className="title signup">
            <h3>Patient SignUp</h3>
          </div>
        </div>

        <div className="form-container">
          <div className="form-inner">
            {errMsg && <p className="error">{errMsg}</p>}
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
    </>
  );
};

export default PatientSignup;
