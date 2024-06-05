import React, { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import "./homepage.css";
import ImageUpload from "../dropfile/imageUpload";
// importing images
import eye from "../../image/eye4.png";
import shield from "../../image/Shield.png";

function Homepage() {
  const auth = useContext(AuthContext);

  const signout = () => {
    auth.setAuth(null);
  };

  return (
    <div>
      <>
        {/* <!-- HeroSection --> */}
        <div className="container">
          <div className="description">
            <h1 className="heading">AYUREYE</h1>
            <p>
              AyurEye shines in areas where human limitations can't make perfect
              decision especially in Radiology image diagnosis
            </p>
          </div>
          <div className="eyeImage">
            <img src={eye} alt="box" />
          </div>
        </div>
        <div className="container">
          <div className="shieldImage">
            <img src={shield} alt="box" />
          </div>
          <div className="description">
            <h1 className="heading">BENEFIT</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
              nulla repudiandae voluptatibus quae magni tempora exercitationem
              numquam maiores nostrum quibusdam.
            </p>
          </div>
        </div>

        {/* <!-- Get Started Button --> */}

        {/* Dropzone for TB file upload */}

        <ImageUpload />
      </>
    </div>
  );
}

export default Homepage;
