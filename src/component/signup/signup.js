import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'
import axios from '../../api/axios'
import './signup.css'
import gLogo from '../../image/gLogo.png'
import uploadPic from '../../image/upload.png'
import DropUploadLicense from '../dropfile/dropUploadLicense'


const REGISTER_URL = 'api/register'
const AUTH_URL = '/auth'

function Signup() {
   const auth = useContext(AuthContext)

   // Creating UseState
   const [firstName, setFirstName] = useState('');
   const [middleName, setMiddleName] = useState('');
   const [lastName, setLastName] = useState('');
   const [address, setAddress] = useState('');
   const [contact, setContact] = useState('');
   const [userName, setUserName] = useState('');
   const [userEmail, setUserEmail] = useState('');
   const [password, setPassword] = useState('');
   const [matchPassword, setMatchPassword] = useState('');
   const [licenseNumber, setLicenseNumber] = useState('');

   // Handling request error
   const [errMsg, setErrMsg] = useState('')

   // const handleSubmit = () => {
   //   console.log(userEmail, password);
   //   auth.setAuth({user: 'useremail', pwd: password});
   // }

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
               password2: matchPassword
            }), {
            headers: { 'Content-Type': 'application/json' }
            // withCredentials: true
         }
         );
         console.log(response);
      } catch (err) {
         console.log(err);
      }
   }


   useEffect(() => {
      // console.log(auth);
   })


   return (
      <>
         {
            auth.auth ?
               <div>
                  You are logged in.
                  <Link to="/homepage"> Return homepage </Link><br />
                  <Link to="profile">Go to profile page</Link>
               </div>

               :

               // <div>
               //   Signup
               // <form onSubmit={handleSubmit}>

               //   First Name: <input type="text" onChange={(e)=>{setFirstName(e.target.value)}}/> <br />
               //   Last Name: <input type="text" onChange={(e)=>{setLastName(e.target.value)}}/> <br />
               //   Email: <input type="text" onChange={(e)=>{setUserEmail(e.target.value)}}/> <br />
               //   Username: <input type="text" onChange={(e)=>{setUserName(e.target.value)}}/> <br />
               //   {/* Address: <input type="text" onChange={(e)=>{setAddress(e.target.value)}}/> <br /> */}


               //   Password: <input type="password" onChange={(e)=>{setPassword(e.target.value)}}/> <br />
               //   Password(Confirm): <input type="password" onChange={(e)=>{setMatchPassword(e.target.value)}}/> <br />
               //   <button type="submit">Submit</button>
               // </form>
               // </div>



               <div className="wrapper">
                  <div className="title-text">
                     <div className="title signup">
                        <h3>SignUp Page</h3>
                     </div>
                  </div>
                  <div className="form-container glogo-box">
                     <img src={gLogo} />
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
                                 onChange={(e) => { setFirstName(e.target.value) }}
                                 required />
                           </div>
                           <div className="field">
                              <input type="text" placeholder="*Middle Name"
                                 value={middleName}
                                 onChange={(e) => { setMiddleName(e.target.value) }}
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
                                 placeholder="Address"
                                 value={address}
                                 onChange={(e) => { setAddress(e.target.value) }}
                                 required />
                           </div>
                           <div className="field">
                              <input
                                 type="number"
                                 placeholder="Contact Number"
                                 value={contact}
                                 onChange={(e) => { setContact(e.target.value) }}
                                 required />
                           </div>
                           <div className="field">
                              <input
                                 type="number"
                                 placeholder="License Number"
                                 value={licenseNumber}
                                 onChange={(e) => { setLicenseNumber(e.target.value) }}
                                 required />
                           </div>
                           <div className="field">
                              <input
                                 type="password"
                                 placeholder="Password"
                                 value={password}
                                 onChange={(e) => { setPassword(e.target.value) }}
                                 required />
                           </div>
                           <div className="field">
                              <input
                                 type="password"
                                 placeholder="Confirm Password"
                                 value={matchPassword}
                                 onChange={(e) => { setMatchPassword(e.target.value) }}
                                 required />
                           </div>

                           {/* Dynamic Upload License */}
                           <DropUploadLicense />

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
               </div>
         }
      </>
   )
}

export default Signup
