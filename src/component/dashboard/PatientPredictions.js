import React from "react";
import { getPredictions, imagebaseURL } from "../../constant/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useGetparticularpredictionMutation } from "../../services/particularPatientServices";
const PatientPredictions = () => {
  const [getparticularprediction, { data, error, isLoading }] =
    useGetparticularpredictionMutation();
  const { id: patient_id } = useParams();
  const getPredictions = async () => {
    var patient = {
      patient_id: patient_id,
    };
    const response = await getparticularprediction(patient);
    console.log(response);
  };
  return (
    <div>
      <ToastContainer />

      <div className="ImageDataContainer">
        <button className="btnUpload" onClick={getPredictions}>
          Get All Predictions
        </button>
        {data && data.length
          ? data.map((image, key) => {
              return (
                <div className="ImageContainer">
                  <p className="name">{image.name}</p>
                  <img
                    src={imagebaseURL + image.img_file}
                    alt={key}
                    className="image"
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default PatientPredictions;
