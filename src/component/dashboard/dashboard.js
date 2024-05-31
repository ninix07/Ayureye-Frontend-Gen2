import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import "./dashboard.css";
import report from "../../image/report2.png";
import { SidbarDashboard } from "./aside";

const linkStyle = {
  textDecoration: "none",
  color: "#9799ab",
};

function Dashboard() {
  const auth = useContext(AuthContext);

  return (
    <>
      {auth.auth ? (
        auth.auth["user-type"] === "Dr" ? (
          <div className="grid-container">
            {/* <!-- Sidebar --> */}
            <SidbarDashboard />
            {/* <!-- End Sidebar --> */}
            {/* <!-- Main --> */}
            <main className="main-container">
              <div className="main-title">
                <p className="font-weight-bold">Welcome, Doctor ABCD</p>
              </div>

              <div className="main-cards">
                <div className="card">
                  <div className="card-inner">
                    <p className="text-primary">Report 1</p>
                    <img src={report} className="image" alt="report" />
                  </div>
                  <div className="margin-top">
                    <span className="font-weight-bold">
                      Detection: Tuberculosis
                    </span>
                    <br />
                    <span className="text-primary font-weight-bold">
                      Detected: 50%
                    </span>
                    <br />
                    <span className="text-primary font-weight-bold">
                      Patient: Anurag Timilsina
                    </span>
                    <br />
                  </div>
                </div>
              </div>
            </main>
          </div>
        ) : (
          <main className="main-container">
            <div className="main-title">
              <p className="font-weight-bold">Welcome {auth.auth["user"]}</p>
            </div>
          </main>
        )
      ) : (
        <div>
          You are not authenticated!!! <br />
          Go to <Link to="/homepage">homepage</Link>!!!
        </div>
      )}
    </>
  );
}

export default Dashboard;
