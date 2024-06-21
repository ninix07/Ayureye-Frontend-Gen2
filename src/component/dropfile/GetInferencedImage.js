import React, { useState } from "react";
import { useGetInferenceImageQuery } from "../../services/inferenceservices";
import { imagebaseURL } from "../../constant/constants";
import "./getImages.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GetInferencedImages = () => {
  const { data, error, isLoading } = useGetInferenceImageQuery();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div>
      <ToastContainer />

      <div className="ImageDataContainer">
        {data && Array.isArray(data) && data.length ? (
          data.map((image, key) => (
            <div
              className="ImageContainer"
              onClick={() => handleImageClick(image)}
              key={key}
            >
              <div className="ImageTableRow">
                <div className="ImageTableHeader">Infection Type</div>
                <div>{image.infection_type}</div>
              </div>
              <div className="ImageTableRow">
                <div className="ImageTableHeader">Confidence</div>
                <div>{image.confidence.toFixed(4)}</div>
              </div>
              <div className="ImageTableRow">
                <div className="ImageTableHeader">Original Image</div>
                <img
                  src={imagebaseURL + "media/" + image.original_image_file}
                  alt={`Original ${key}`}
                  className="image"
                />
              </div>
              <div className="ImageTableRow">
                <div className="ImageTableHeader">Predicted Image</div>
                <img
                  src={imagebaseURL + "media/" + image.predicted_image_file}
                  alt={`Predicted ${key}`}
                  className="image"
                />
              </div>
            </div>
          ))
        ) : (
          <p>No images found.</p>
        )}
      </div>
    </div>
  );
};

export default GetInferencedImages;
