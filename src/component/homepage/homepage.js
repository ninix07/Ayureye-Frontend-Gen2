import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthProvider'
import './homepage.css'
import Dropfile from '../dropfile/dropfile'

// importing images
import eye from '../../image/eye4.png'
import shield from '../../image/Shield.png'
import dhLogo from '../../image/DH_logo_bg.png'
import kuLogo from '../../image/KU logo.png'
import defaultProfile from '../../image/profile.jpg'

function Homepage() {
    const auth = useContext(AuthContext);

    const signout = () => {
        auth.setAuth(null)
    }

    return (
        <div>
            {auth.auth ?
                <div>
                    <button onClick={signout}> Sign Out</button>
                    Welcome: {auth.auth["email"]}
                </div>

                :

                <></>}<br />
            <>
                {/* <!-- HeroSection --> */}
                <div className="container">
                    <div className="description">
                        <h1 className="heading">AYUREYE</h1>
                        <p>AyurEye shines in areas where human limitations can't make perfect decision especially in Radiology image diagnosis</p>
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
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure nulla repudiandae voluptatibus quae magni tempora exercitationem numquam maiores nostrum quibusdam.</p>
                    </div>
                </div>


                {/* <!-- Get Started Button --> */}
                <div className='container'>
                    <div className="startedBox">
                        <button className='getstartedbutton'>GET STARTED</button>
                    </div>
                </div>

                {/* Dropzone for TB file upload */}
                <Dropfile />

                {/* <!-- Our Partners --> */}
                <div class="container">
                    <div class="logo-container">
                        <h2>Our Partners</h2>
                        <div class='logos'>
                            <img src={dhLogo} alt="Dhulikhel Logo" class='logo' />
                            <img src={kuLogo} alt="KU Logo" class='logo' />
                        </div>
                    </div>
                </div>

                {/* <!-- Our Contributors --> */}
                <div class="container">
                    <div class="contributor-container">
                        <h2>Contributers</h2>
                        <div class="cont-box">
                            <div class="contributers">
                                <div class="cont-img">
                                    <img src={defaultProfile} alt="profile" />
                                    <span>Avaya Bajracharya</span>
                                    <span>Software Engineer</span>
                                </div>
                                <div class="cont-img">
                                    <img src={defaultProfile} alt="profile" />
                                    <span>Anish Manandhar</span>
                                    <span>AI Researcher</span>
                                </div>
                                <div class="cont-img">
                                    <img src={defaultProfile} alt="profile" />
                                    <span>Anurag Timilsina</span>
                                    <span>AI Researcher</span>
                                </div>
                                <div class="cont-img">
                                    <img src={defaultProfile} alt="profile" />
                                    <span>Ashish Thapa</span>
                                    <span>Software Engineer</span>
                                </div>
                            </div>
                            <div class="contributers">
                                <div class="cont-img">
                                    <img src={defaultProfile} alt="profile" />
                                    <span>Ayush Paudel</span>
                                    <span> Software Engineer</span>
                                </div>
                                <div class="cont-img">
                                    <img src={defaultProfile} alt="profile" />
                                    <span>Dr. Rajendra Adhikari</span>
                                    <span>Research Facilitator</span>
                                </div>
                                <div class="cont-img">
                                    <img src={defaultProfile} alt="profile" />
                                    <span>Dr. Rabindra Bista</span>
                                    <span>Research Supervisor</span>
                                </div>

                                <div class="cont-img">
                                    <img src={defaultProfile} alt="profile" />
                                    <span>Dr. Sagar Wagle</span>
                                    <span>Radiology consultant</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}

export default Homepage
