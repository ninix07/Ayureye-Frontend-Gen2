// src/ImagePreview.js
import React, { useState } from "react";
import {
  useGetImageQuery,
  useSendImageMutation,
} from "../../services/inferenceservices";
import { userApi } from "../../services/userServices";
import { useSelector } from "react-redux";
import Upload from "../../image/upload.png";
import "./imageUpload.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [sendImage, { isLoading, error, data }] = useSendImageMutation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user_id = useSelector(
    (state) =>
      state[userApi.reducerPath].queries["reloadUser(undefined)"]?.data?.id
  );

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
      Image.append("patient_id", "2");
      console.log(Image.patient_id);
      try {
        const response = await sendImage(Image).unwrap();
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
    <div className="container">
      <ToastContainer />
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
              Remove Image
            </button>
            <button onClick={submitImage} className="btnUpload">
              Submit Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
