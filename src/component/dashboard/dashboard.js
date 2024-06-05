import React, { useContext } from "react";
import "./dashboard.css";
import { userApi } from "../../services/userServices";
import { useSelector } from "react-redux";
import DoctorDashboard from "./doctorDashboard";
import PatientDashboard from "./patientDashboard";
import { SidbarDashboard } from "./aside";
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
        <SidbarDashboard />
        {user_type == "Dr" ? <DoctorDashboard /> : <PatientDashboard />}
      </div>
    </>
  );
}

export default Dashboard;
