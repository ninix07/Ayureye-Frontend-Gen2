import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

//importing the components
import DoctorLogin from './component/login/doctorLogin';
import PatientLogin from './component/login/patientLogin';
import DoctorSignup from './component/signup/doctorSignup';
import PatientSignup from './component/signup/patientSignup';
import Homepage from './component/homepage/homepage';
import Dashboard from './component/dashboard/dashboard';
import Profile from './component/profile/profile';
import { useContext } from 'react';
import AuthContext from './context/AuthProvider';
import Navbar from './component/navbar/navbar';
import PatientProfileDashboard from './component/dashboard/patientProfileDashboard';
import { PatientXRay } from './component/dashboard/patientxray';
//importing auth


function App() {
  const auth = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/login/doctor" >
          <DoctorLogin />
        </Route>
        <Route path="/login/patient" >
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
        <Route exath path="/">
          <Homepage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
