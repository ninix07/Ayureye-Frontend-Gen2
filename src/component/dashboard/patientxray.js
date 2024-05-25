import { Route, Link, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { SidbarDashboard } from './aside';
import DropUploadLicense from '../dropfile/dropUploadLicense';
import axios from '../../api/axios';

import AuthContext from '../../context/AuthProvider'

// const UPLOAD_XRAY = "/api/doctor_view/";
const UPLOAD_XRAY = "/prediction_api/image/"
export const PatientXRay = () => {
    let { id } = useParams();
    let [files, setFiles] = useState([]);
    let [submitted, setSubmitted] = useState(false)
    let [isTb, setTb] = useState(false);
    let [message, setMessage] = useState("");
    const auth = useContext(AuthContext);
    async function submitData(e) {
        e.preventDefault();
        setTb(false);
        setMessage("");
        try {
            let formData = new FormData();
            formData.append("image", files[0]);
            formData.append("patient", id);
            formData.append("doctor", auth.auth['user-id']);
            console.log(auth.auth['access']);
            const response = await axios.post(UPLOAD_XRAY, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + auth.auth['access'],
                }
            });
            console.log(response.data);
            if (response.data.response === "Successfully submitted image") {
                setSubmitted(true);
            }
            if (response.data.label === "Tuberculosis") {
                setTb(true)
                setMessage("patient might be infected with Tuberculosis");
            } else {
                setMessage("Couldn't verify if patient has been infected or not")
            }
        } catch (err) {
            console.log(err);
        }
        console.log(files);
    }
    function reset() {
        setMessage("");
        setTb(false);
    }
    return (
        <div className='grid-container'>
            <SidbarDashboard />

            <main className="main-container">
                <DropUploadLicense files={files} setFiles={setFiles} isTb={isTb} onClick={reset} />
                <br />
                <form onSubmit={submitData}>
                    <div className="field btn">
                        <div className="btn-layer"></div>
                        <input type="submit" value="Upload XRay" />
                    </div>
                </form>
                {submitted ? "Submitted Successfully" : ""}
                <center><h1 style={{ "color": "red" }}>{message}</h1></center>
                <br />
                <br />
                <br />
                <br />
                <br />
            </main>
        </div >);
}