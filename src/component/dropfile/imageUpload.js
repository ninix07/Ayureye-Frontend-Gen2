// src/ImagePreview.js
import React, { useState } from "react";
import {
  useGetImageQuery,
  useSendImageMutation,
} from "../../services/inferenceservices";
import { useSelector } from "react-redux";

const ImagePreview = () => {
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
      console.log("Please Login first");
    } else {
      var Image = new FormData();
      Image.append("image", image);
      try {
        const response = await sendImage(Image).unwrap();
        console.log(response);
        console.log("Succesfully upload file");
      } catch (err) {
        console.log(err);
        console.log("Couldn't upload image");
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imageUrl && (
        <div>
          <img
            src={imageUrl}
            alt="Preview"
            style={{ width: "300px", marginTop: "20px" }}
          />
          <button onClick={handleImageRemove}>Remove Image</button>
          <button onClick={submitImage}>Submit Image</button>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
