import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'
import axios from '../../api/axios'
import './signup.css'


const REGISTER_URL = 'api/register/'

function PatientSignup() {
   const auth = useContext(AuthContext)
   // Creating UseState
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [userName, setUserName] = useState('');
   const [userEmail, setUserEmail] = useState('');
   const [password, setPassword] = useState('');

   // Handling request error
   const [errMsg, setErrMsg] = useState('');
   const [patientCreated, setPatientCreated] = useState(false);


   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post(REGISTER_URL,
            JSON.stringify({
               first_name: firstName,
               last_name: lastName,
               email: userEmail,
               username: userName,
               password: password,
               password2: password
            }), {
            headers: { 'Content-Type': 'application/json' }
            // withCredentials: true
         }
         );
         let data = await response.data;
         if (data.response === "successfully registered") {
            setPatientCreated(true);
         }
      } catch (err) {
         console.log(err);
      }
   }

   return (
      <>
         {
            auth.auth ?
               (
                  !patientCreated ?
                     (<div className="wrapper">
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
                                       onChange={(e) => { setFirstName(e.target.value) }}
                                       required />
                                 </div>

                                 <div className="field">
                                    <input
                                       type="text"
                                       placeholder="Last Name"
                                       value={lastName}
                                       onChange={(e) => { setLastName(e.target.value) }}
                                       required />
                                 </div>
                                 <div className="field">
                                    <input
                                       type="text"
                                       placeholder="Email Address"
                                       value={userEmail}
                                       onChange={(e) => { setUserEmail(e.target.value) }}
                                       required />
                                 </div>
                                 <div className="field">
                                    <input
                                       type="text"
                                       placeholder="Username"
                                       value={userName}
                                       onChange={(e) => { setUserName(e.target.value) }}
                                       required />
                                 </div>

                                 <div className="field">
                                    <input
                                       type="text"
                                       placeholder="Password"
                                       value={password}
                                       onChange={(e) => { setPassword(e.target.value) }}
                                       required />
                                 </div>
                                 {/* Submit Button */}
                                 <div className="field btn">
                                    <div className="btn-layer"></div>
                                    <input type="submit" value="Signup" />
                                 </div>
                              </form>
                           </div>
                        </div>
                        {/* <span className='small-text center no-padding'>Already have account? <Link to="/login/doctor">Login Here</Link></span> */}
                     </div>) : (
                        <>
                           <div>
                              <p> Patient Created</p>
                              <p>Username: {userName}</p>
                              <p>password: {password}</p>
                              <Link to="/dashboard/patientProfile" className="btn-layer">Add another Patient</Link>
                           </div>
                        </>)) : <div>
                  You must be doctor to be able to create patient
                  <Link to="/homepage"> Return homepage </Link><br />
                  {/* <Link to="profile">Go to profile page</Link> */}
               </div>
         }
      </>
   )
}

export default PatientSignup