import React, { useEffect, useState } from "react";
import { useLazyGetImageQuery } from "../../services/inferenceservices";
import { imagebaseURL } from "../../constant/constants";
import "./getImages.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const GetImages = () => {
  const [triggerGetImage, { data, error, isLoading }] = useLazyGetImageQuery();
  const [imageData, setImageData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const GetImage = async (e) => {
    e.preventDefault();
    try {
      const response = await triggerGetImage();
      setImageData(response.data);
      console.log(response.data);
      console.log(imageData);
      console.log("Succesfully got Images file");
    } catch (err) {
      console.error("Failed to register doctor: ", err);
      toast.error(err.data?.detail || "An Error Occured");
    }
  };
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  return (
    <div>
      <ToastContainer />
      <button
        onClick={GetImage}
        className={imageData.length ? "Remove" : "btnUpload"}
      >
        Get All Image
      </button>
      <div className="ImageDataContainer">
        {imageData.length
          ? imageData.map((image, key) => {
              return (
                <div
                  className="ImageContainer"
                  onClick={() => handleImageClick(image)}
                >
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

export default GetImages;
