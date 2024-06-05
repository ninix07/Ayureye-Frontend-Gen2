import { useParams } from "react-router-dom";
import { SidbarDashboard } from "./aside";
import React, { useState } from "react";
import {
  useGetImageQuery,
  useSendImageMutation,
  useRunInferenceMutation,
} from "../../services/inferenceservices";
import { userApi } from "../../services/userServices";
import { useSelector } from "react-redux";
import Upload from "../../image/upload.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const UPLOAD_XRAY = "/api/doctor_view/";
const UPLOAD_XRAY = "/prediction_api/image/";
export const PatientXRay = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [runInference, { isLoading, error, data }] = useRunInferenceMutation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user_id = useSelector(
    (state) =>
      state[userApi.reducerPath].queries["reloadUser(undefined)"]?.data?.id
  );
  const patient_id = useParams().id;
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    } else {
      toast.error("Please select a valid image file.");
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setImageUrl(null);
    URL.revokeObjectURL(imageUrl);
  };
  const submitImage = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please Login first");
    } else {
      var Image = new FormData();
      Image.append("image", image);
      Image.append("patient_id", patient_id);
      console.log(Image.patient_id);
      try {
        const response = await runInference(Image).unwrap();
        console.log(response);
        toast.success("Succesfully upload file");
      } catch (err) {
        console.log(err);
        toast.error(err.data?.detail || "An Error Occured");
      }
    }
    setImage(null);
    setImageUrl(null);
    URL.revokeObjectURL(imageUrl);
  };

  return (
    <div className="grid-container">
      <SidbarDashboard />
      <div className="main-container">
        <div className="container">
          {!imageUrl && (
            <div className="inputContainer">
              <img src={Upload} className="UploadImage" />
              <div>
                <p className="UploadText">Please Upload your file here!</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="Input"
                />
              </div>
            </div>
          )}
          {imageUrl && (
            <div>
              <img
                src={imageUrl}
                alt="Preview"
                style={{ width: "300px", marginTop: "20px" }}
                className="ImageDisplay"
              />
              <div className="btnContainer">
                <button onClick={handleImageRemove} className="btnUpload">
                  Remove Xray
                </button>
                <button onClick={submitImage} className="btnUpload">
                  Upload X-ray
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
