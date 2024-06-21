import React, { useEffect, useState } from "react";
import { useGetImageQuery } from "../../services/inferenceservices";
import { imagebaseURL } from "../../constant/constants";
import "./getImages.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const GetImages = () => {
  const { data, error, isLoading } = useGetImageQuery();
  const [imageData, setImageData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  return (
    <div>
      <ToastContainer />

      <div className="ImageDataContainer">
        {data && data.length
          ? data.map((image, key) => {
              return (
                <div
                  className="ImageContainer"
                  onClick={() => handleImageClick(image)}
                >
                  <div className="ImageTableRow">
                    <div className="ImageTableHeader">Name</div>
                    <div>{image.name}</div>
                  </div>
                  <div className="ImageTableRow">
                    <div className="ImageTableHeader">Patient</div>
                    <div>{image.patient}</div>
                  </div>
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

export default GetImages;
