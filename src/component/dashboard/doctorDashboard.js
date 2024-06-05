import React from "react";
import { userApi } from "../../services/userServices";
import { useSelector } from "react-redux";
import { useGetAllPatientQuery } from "../../services/patientServices";
import "./doctorDashboard.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const DoctorDashboard = () => {
  const navigate = useHistory();
  const user = useSelector(
    (state) => state[userApi.reducerPath].queries["reloadUser(undefined)"]?.data
  );
  const getAllImages = () => {
    navigate.push("/get");
  };
  const getAllInferenceImages = () => {
    navigate.push("/all_inferences");
  };
  const checkoutPatient = (id) => {
    navigate.push(`/dashboard/patient/${id}`);
  };
  const { isLoading, error, data } = useGetAllPatientQuery();
  return (
    <div className="doctorDashboard">
      <div className="DoctorBlock">
        <p className="welcomeText">
          Welcome Doctor{" "}
          <span className="DoctorUsername">{user.username},</span>{" "}
        </p>
      </div>
      <div className="buttons">
        <button className="btnUpload" onClick={getAllImages}>
          Get All Images
        </button>
        <button className="btnUpload" onClick={getAllInferenceImages}>
          Get All Inferenced Images
        </button>
      </div>
      <div className="allPatientContainer">
        <div className="patientHeadingContainer">
          <p className="header">Patient Id</p>
          <p className="header"> Patient Name</p>
          <p className="header"> Patient Username</p>
        </div>
        {data && data.length
          ? data.map((patinet, key) => {
              return (
                <div
                  className="patientContainer"
                  key={patinet.id}
                  onClick={() => checkoutPatient(patinet.id)}
                >
                  <p className="id">{patinet.id}</p>
                  <p className="id">
                    {patinet.first_name + " " + patinet.last_name}
                  </p>
                  <p className="username">{patinet.username}</p>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default DoctorDashboard;
