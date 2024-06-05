import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

//importing the components
import DoctorLogin from "./component/login/doctorLogin";
import PatientLogin from "./component/login/patientLogin";
import DoctorSignup from "./component/signup/doctorSignup";
import PatientSignup from "./component/signup/patientSignup";
import Homepage from "./component/homepage/homepage";
import Dashboard from "./component/dashboard/dashboard";
import Profile from "./component/profile/profile";
import { useContext, useEffect } from "react";
import AuthContext from "./context/AuthProvider";
import Navbar from "./component/navbar/navbar";
import PatientProfileDashboard from "./component/dashboard/patientProfileDashboard";
import { PatientXRay } from "./component/dashboard/patientxray";
import ImageUpload from "./component/dropfile/imageUpload";
import GetImages from "./component/dropfile/GetImages";
import { useSelector } from "react-redux";
import { useReloadUserQuery } from "./services/userServices";
import GetInferencedImages from "./component/dropfile/GetInferencedImage";
//importing auth

function App() {
  const { error, data, isLoading } = useReloadUserQuery();
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/login/doctor">
          <DoctorLogin />
        </Route>
        <Route path="/login/patient">
          <PatientLogin />
        </Route>
        <Route path="/signup/doctor">
          <DoctorSignup />
        </Route>
        <Route path="/signup/patient">
          <PatientSignup />
        </Route>
        <Route path="/dashboard/patientProfile">
          <PatientProfileDashboard />
          {/* <Homepage/> */}
        </Route>
        <Route path="/dashboard/patient/:id">
          <PatientXRay />
          {/* <Homepage/> */}
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/upload">
          <ImageUpload />
        </Route>
        <Route path="/get">
          <GetImages />
        </Route>
        <Route path="/all_inferences">
          <GetInferencedImages />
        </Route>
        <Route exath path="/">
          <Homepage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
