import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useGetparticularpredictionMutation } from "../../services/particularPatientServices";
import { imagebaseURL } from "../../constant/constants";

const PatientPredictions = () => {
  const [getparticularprediction, { data, error, isLoading }] =
    useGetparticularpredictionMutation();
  const { id: patient_id } = useParams();

  const getPredictions = async () => {
    var patient = {
      patient_id: patient_id,
    };
    try {
      await getparticularprediction(patient);
    } catch (error) {
      toast.error("Error retrieving predictions.");
    }
  };

  return (
    <div>
      <ToastContainer />

      <div className="ImageDataContainer">
        <button className="btnUpload" onClick={getPredictions}>
          Get All Predictions
        </button>
        {data && data.length
          ? data.map((image, key) => (
              <div className="ImageContainer" key={key}>
                <div className="ImageTableRow">
                  <div className="ImageTableHeader">Name</div>
                  <div>{image.name}</div>
                </div>
                <div className="ImageTableRow">
                  <div className="ImageTableHeader">Patient</div>
                  <div>{image.patient}</div>
                </div>
                <div className="ImageTableRow">
                  <div className="ImageTableHeader">Diagnosing Doctor</div>
                  <div>{image.diagnosing_doctor}</div>
                </div>
                <div className="ImageTableRow">
                  <div className="ImageTableHeader">Image</div>
                  <img
                    src={imagebaseURL + image.img_file}
                    alt={key}
                    className="image"
                  />
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default PatientPredictions;
