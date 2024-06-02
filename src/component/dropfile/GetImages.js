import React, { useEffect, useState } from "react";
import {
  useLazyGetImageQuery,
  useSendImageMutation,
} from "../../services/inferenceservices";
import { useSelector } from "react-redux";
import { imagebaseURL } from "../../constant/constants";
const GetImages = () => {
  const [triggerGetImage, { data, error, isLoading }] = useLazyGetImageQuery();
  const [imageData, setImageData] = useState([]);
  const GetImage = async (e) => {
    e.preventDefault();
    try {
      const response = await triggerGetImage();
      setImageData(response.data);
      console.log(response.data);
      console.log(imageData);
      console.log("Succesfully got Images file");
    } catch (err) {
      console.log(err);
      console.log("Couldn't get image");
    }
  };
  return (
    <div>
      <button onClick={GetImage}>Get All Image</button>
      {imageData
        ? imageData.map((image, key) => {
            return (
              <div>
                <p>{image.id}</p>
                <p>{imagebaseURL + image.img_file}</p>
                <img src={imagebaseURL + image.img_file} alt={key} />
              </div>
            );
          })
        : null}
    </div>
  );
};

export default GetImages;
