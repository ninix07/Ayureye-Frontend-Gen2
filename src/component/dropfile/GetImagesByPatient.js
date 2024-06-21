import React from "react";
import { imagebaseURL } from "../../constant/constants";
import "./getImages.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetparticularImageQuery } from "../../services/particularPatientServices";
const GetImagesPatient = () => {
  const { data, error, isLoading } = useGetparticularImageQuery();
  return (
    <div>
      <ToastContainer />

      <div className="ImageDataContainer">
        {data && data.length
          ? data.map((image, key) => {
              return (
                <div className="ImageContainer">
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

export default GetImagesPatient;
