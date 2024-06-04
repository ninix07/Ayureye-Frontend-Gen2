import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import "./dashboard.css";
import report from "../../image/report2.png";
import { SidbarDashboard } from "./aside";
import { useGetAllPatientQuery } from "../../services/patientServices";
const linkStyle = {
  textDecoration: "none",
  color: "#9799ab",
};

function Dashboard() {
  const auth = useContext(AuthContext);
  const { isLoading, error, data } = useGetAllPatientQuery();

  return (
    <>
      <div className="grid-container"></div>
    </>
  );
}

export default Dashboard;
