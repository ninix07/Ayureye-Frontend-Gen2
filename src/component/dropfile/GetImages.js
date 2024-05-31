import React from "react";
import {
  useLazyGetImageQuery,
  useSendImageMutation,
} from "../../services/inferenceservices";
const GetImages = () => {
  const [triggerGetImage, { data, error, isLoading }] = useLazyGetImageQuery();
  const GetImage = async (e) => {
    e.preventDefault();
    try {
      const response = await triggerGetImage();
      console.log(response);
      console.log("Succesfully got Images file");
    } catch (err) {
      console.log(err);
      console.log("Couldn't get image");
    }
  };
  return (
    <div>
      <button onClick={GetImage}>Get All Image</button>
    </div>
  );
};

export default GetImages;
