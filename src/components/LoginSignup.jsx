import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "../firebase";

const LoginSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  // 🔹 Signup with Email & Password
  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("userCredentials: ", userCredential);
      const user = userCredential.user;
      await saveUserToBackend(user);
      navigate("/payment"); // Redirect to payment page
    } catch (error) {
      console.error("Signup Error:", error.message);
    }
  };

  // 🔹 Login with Email & Password
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("userCredentials: ", userCredential);
      const user = userCredential.user;
      await saveUserToBackend(user);
      navigate("/payment"); // Redirect to payment page
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  // 🔹 Login with Google
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("email", result);
      const user = result.user;
      const ress=await saveUserToBackend(user);
      console.log("ress", ress);
      // navigate("/payment"); // Redirect to payment page
    } catch (error) {
      console.error("Google Login Error:", error.message);
    }
  };

  // 🔹 Send user data to backend
  const saveUserToBackend = async (user) => {
    // await fetch("http://localhost:5000/auth/save-user", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     uid: user.uid,
    //     name: user.displayName || "N/A",
    //     email: user.email,
    //     photo: user.photoURL || "N/A",
    //   }),
    // });
    await fetch("http://localhost:5000/api/g_login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid:user.uid,
          email: user.email,
          displayName: user.displayName ,
          mobile_no: "9876543210", // Change or get this from user input
          role_id: 1, // Replace with actual role_id
          permission_id: 2, // Example data
          ref_code: "ABC123", // Example referral code
          gender_id: 1, // Example gender_id
          bill_plan: "Premium", // Example billing plan
        }),
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login & Signup</h2>
        
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button 
          onClick={handleSignup}
          className="w-full px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Signup
        </button>
        
        <button 
          onClick={handleLogin}
          className="w-full px-4 py-2 text-white transition duration-300 bg-green-600 rounded-md hover:bg-green-700"
        >
          Login
        </button>
        
        <button 
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition duration-300 bg-red-600 rounded-md hover:bg-red-700"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <path fill="#4285F4" d="M24 9.5c3.84 0 7.27 1.43 9.94 3.78l7.35-7.14C37.94 2.2 31.32 0 24 0 14.64 0 6.42 5.36 2.34 13.18l8.86 6.88C13.16 12.36 18.12 9.5 24 9.5z" />
            <path fill="#34A853" d="M46.98 24.5c0-1.42-.14-2.78-.4-4.1H24v8h13.16c-.61 3.16-2.33 5.86-4.92 7.68l7.53 5.9C43.44 37.7 46.98 31.8 46.98 24.5z" />
            <path fill="#FBBC05" d="M11.2 28.9c-.92-.64-1.78-1.36-2.54-2.16l-8.86 6.88C4.42 40.64 13.64 46 24 46c6.82 0 12.98-2.26 17.77-6.08l-7.53-5.9c-2.56 1.68-5.84 2.68-9.24 2.68-6 0-11.12-3.92-13.8-9.8z" />
            <path fill="#EA4335" d="M2.34 13.18C.84 16.14 0 19.46 0 23c0 3.54.84 6.86 2.34 9.82l8.86-6.88C10.32 24.9 10 23.48 10 22s.32-2.9.94-4.18l-8.6-6.88z" />
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginSignup;
