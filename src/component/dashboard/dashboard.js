import React, { useContext } from "react";
import "./dashboard.css";
import { userApi } from "../../services/userServices";
import { useSelector } from "react-redux";
import DoctorDashboard from "./doctorDashboard";
import { SidbarDashboard } from "./aside";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const linkStyle = {
  textDecoration: "none",
  color: "#9799ab",
};

function Dashboard() {
  const user_type = useSelector(
    (state) =>
      state[userApi.reducerPath].queries["reloadUser(undefined)"]?.data
        ?.user_type
  );
  return (
    <>
      <div className="grid-container">
        {user_type == "Dr" ? (
          <>
            <SidbarDashboard />
            <DoctorDashboard />
          </>
        ) : (
          <p>
            You are not authnticated.Please go back to{" "}
            <Link to="/">Home Page.</Link>
          </p>
        )}
      </div>
    </>
  );
}

export default Dashboard;
