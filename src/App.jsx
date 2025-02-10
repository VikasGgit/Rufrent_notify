import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import LoginSignup from "./components/LoginSignup";
import Payment from "./components/Payment";
import NotificationComponent from "./components/Notification";

// import Payment from "./components/Payment";
// import GoogleLogin from "./components/GoogleLogin";
// import EmailVerification from './components/EmailVerification'
// import LoginSignup from "./components/LoginSignup";

const PrivateRoute = ({ children }) => {
  const user = auth.currentUser; // Get the current authenticated user
  return user ? children : <Navigate to="/" />; // Redirect to login if not logged in
};

const App = () => {
  return (
   <>
    <NotificationComponent userId="1" /> {/* Replace with your user ID */}
    <NotificationComponent userId="2" /> {/* Replace with your user ID */}
    <NotificationComponent userId="3" /> {/* Replace with your user ID */}
    <NotificationComponent userId="4" /> {/* Replace with your user ID */}
     
   </>
  );
};

export default App;
