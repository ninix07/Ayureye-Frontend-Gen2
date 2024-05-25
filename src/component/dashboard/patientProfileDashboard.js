import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider'
import './dashboard.css'
import defaultProfile from '../../image/profile.jpg'
import { SidbarDashboard } from './aside';
import axios from '../../api/axios';

const linkStyle = {
  textDecoration: "none",
  color: "#9799ab"
}


const PATIENT_URL = "/api/list_patients/"
function PatientProfileDashboard() {
  const auth = useContext(AuthContext);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (auth.auth) {
      async function fetchData() {
        const response = await axios.get(PATIENT_URL,
          {
            headers: {
              'Authorization': 'Bearer ' + auth.auth['access'],
              'Content-Type': 'application/json'
            }
          }
        );
        setPatients(response.data);
      }
      fetchData();
    }
  }, [auth.auth]);

  return (
    <>
      {auth.auth ?

        <div className="grid-container">
          {/* <!-- Sidebar --> */}
          <SidbarDashboard />
          {/* <!-- End Sidebar --> */}

          {/* <!-- Main --> */}
          <main className="main-container">
            <div className="main-title">
              {/* <p className="font-weight-bold">Welcome, Doctor ABCD</p> */}
              <Link to="/signup/patient"><button className="add-button">Add Patient</button></Link>
            </div>

            <div className="main-cards">
              {patients.map((data) => {
                return (
                  <div className="card">

                    <Link to={`/dashboard/patient/${data.id}`} style={{textDecoration:"none"}}>
                      <div className="card-inner">
                        <p className="text-secondary" style={{ fontSize: "13px" }}>{data.username}</p>
                        <img src={defaultProfile} className="image" alt="profile" />
                      </div>
                      <div className="margin-top">
                        <span className="text-primary">Patient: {data.username}</span><br />
                        <span className="font-weight-bold">Date Created: {data.date_joined}</span><br />
                        {/* <span className="text-primary font-weight-bold">Detected: 50%</span><br/> */}
                      </div>
                    </Link>
                  </div>
                )
              })}

            </div>




          </main>

          {/* <!-- End Main --></div> */}


        </div>


        :

        <div>
          You are not authenticated!!!  <br />
          Go to <Link to="/homepage">homepage</Link>!!!

        </div>
      }
    </>
  )
}

export default PatientProfileDashboard
