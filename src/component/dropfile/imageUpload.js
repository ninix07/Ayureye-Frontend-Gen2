// src/ImagePreview.js
import React, { useState } from "react";
import {
  useGetImageQuery,
  useSendImageMutation,
} from "../../services/inferenceservices";
import { useSelector } from "react-redux";
import Upload from "../../image/upload.png";
import "./imageUpload.css";
const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [sendImage, { isLoading, error, data }] = useSendImageMutation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image file.");
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
      alert("Please Login first");
    } else {
      var Image = new FormData();
      Image.append("image", image);
      try {
        const response = await sendImage(Image).unwrap();
        console.log(response);
        alert("Succesfully upload file");
      } catch (err) {
        console.log(err);
        alert("Couldn't upload image");
      }
    }
    setImage(null);
    setImageUrl(null);
    URL.revokeObjectURL(imageUrl);
  };

  return (
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
            <button onClick={handleImageRemove} className="btn">
              Remove Image
            </button>
            <button onClick={submitImage} className="btn">
              Submit Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
