import { useParams, useHistory } from "react-router-dom";
import { SidbarDashboard } from "./aside";
import React, { useState, useEffect } from "react";
import { useRunInferenceMutation } from "../../services/inferenceservices";
import { userApi } from "../../services/userServices";
import { useSelector } from "react-redux";
import Upload from "../../image/upload.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";
import { imagebaseURL } from "../../constant/constants";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
  const { id: patient_id } = useParams();
  const history = useHistory();

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
      setImage(null);
      setImageUrl(null);
      URL.revokeObjectURL(imageUrl);
      try {
        const response = await runInference(Image).unwrap();
        console.log("Upload response:", response);
        toast.success("Successfully uploaded file");
      } catch (err) {
        toast.error(err.data?.detail || "An Error Occurred");
      }
    }
  };

  const InferenceNew = () => {
    history.push("/new-location"); // Navigate to a new location
  };

  useEffect(() => {
    if (data) {
      console.log("Fetched data:", data);
    }
  }, [data]);

  return (
    <div className="grid-container">
      <SidbarDashboard />
      <div className="main-container">
        <div className="container">
          {isLoading ? (
            <div className="loadingContainer">
              <ReactLoading
                type="spin"
                color="#0000ff"
                height={50}
                width={50}
              />
            </div>
          ) : (
            <>
              {!imageUrl && !data && (
                <div className="inputContainer">
                  <img src={Upload} className="UploadImage" alt="Upload" />
                  <div>
                    <p className="UploadText">Please Upload your file here!</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="Input"
                    />
                    <p className="UploadText">OR</p>
                    <p className="UploadText">
                      <Link to={`/patient/predictions/${patient_id}`}>
                        Click here to see all inferences
                      </Link>
                    </p>
                  </div>
                </div>
              )}
              {data && (
                <div className="ImageContainer">
                  {data.msg && <p className="name">{data.msg}</p>}
                  {data.detections && data.detections.length
                    ? data.detections.map((infections, key) => {
                        return (
                          <div key={key}>
                            {infections.infection_types &&
                            infections.infection_types.length ? (
                              infections.infection_types.map(
                                (infection, index) => (
                                  <p key={index}>
                                    Infection Type: {infection}, Confidence:{" "}
                                    {infections.confidence[index]}
                                  </p>
                                )
                              )
                            ) : (
                              <p>No infection types found.</p>
                            )}
                          </div>
                        );
                      })
                    : null}
                  <img
                    src={imagebaseURL + "media/" + data.img_file}
                    className="image"
                  />
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
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
