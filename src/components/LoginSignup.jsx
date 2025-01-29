// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, provider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "../firebase";

// const LoginSignup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate(); // Initialize navigation

//   // 🔹 Signup with Email & Password
//   const handleSignup = async () => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       console.log("userCredentials: ", userCredential);
//       const token=userCredential._tokenResponse.idToken
//       const user = userCredential.user;
//      const ress= await saveUserToBackend(user, token);
//      console.log("user: ", ress);
//       // navigate("/payment"); // Redirect to payment page
//     } catch (error) {
//       console.error("Signup Error:", error.message);
//     }
//   };

//   // 🔹 Login with Email & Password
//   const handleLogin = async () => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
      
//       console.log("userCredentials: ", userCredential);
//       await fetch("http://localhost:5000/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           token:userCredential._tokenResponse.idToken, 
//           uid:user.uid
//         })})

//     } catch (error) {
//       console.error("Login Error:", error.message);
//     }
//   };

//   // 🔹 Login with Google
//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const token=result._tokenResponse.idToken
//       console.log("email", result);
//       const user = result.user;
//       const ress=await saveUserToBackend(user, token);
//       console.log("ress", ress);
//       // navigate("/payment"); // Redirect to payment page
//     } catch (error) {
//       console.error("Google Login Error:", error.message);
//     }
//   };

//   // 🔹 Send user data to backend
//   const saveUserToBackend = async (user, token) => {
//     // await fetch("http://localhost:5000/auth/save-user", {
//     //   method: "POST",
//     //   headers: { "Content-Type": "application/json" },
//     //   body: JSON.stringify({
//     //     uid: user.uid,
//     //     name: user.displayName || "N/A",
//     //     email: user.email,
//     //     photo: user.photoURL || "N/A",
//     //   }),
//     // });
//  const ress=   await fetch("http://localhost:5000/api/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           uid:user.uid,
//           email: user.email,
//           token:token,
//           displayName: user.displayName ,
//           mobile_no: user.phoneNumber,
//           role_id: 2, // Replace with actual role_id
//         }),
//       });

//       console.log("response from saviing", ress);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold text-center text-gray-800">Login & Signup</h2>
        
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           onChange={(e) => setEmail(e.target.value)}
//         />
        
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           onChange={(e) => setPassword(e.target.value)}
//         />
        
//         <button 
//           onClick={handleSignup}
//           className="w-full px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
//         >
//           Signup
//         </button>
        
//         <button 
//           onClick={handleLogin}
//           className="w-full px-4 py-2 text-white transition duration-300 bg-green-600 rounded-md hover:bg-green-700"
//         >
//           Login
//         </button>
        
//         <button 
//           onClick={handleGoogleLogin}
//           className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition duration-300 bg-red-600 rounded-md hover:bg-red-700"
//         >
//           <svg className="w-5 h-5" viewBox="0 0 48 48">
//             <path fill="#4285F4" d="M24 9.5c3.84 0 7.27 1.43 9.94 3.78l7.35-7.14C37.94 2.2 31.32 0 24 0 14.64 0 6.42 5.36 2.34 13.18l8.86 6.88C13.16 12.36 18.12 9.5 24 9.5z" />
//             <path fill="#34A853" d="M46.98 24.5c0-1.42-.14-2.78-.4-4.1H24v8h13.16c-.61 3.16-2.33 5.86-4.92 7.68l7.53 5.9C43.44 37.7 46.98 31.8 46.98 24.5z" />
//             <path fill="#FBBC05" d="M11.2 28.9c-.92-.64-1.78-1.36-2.54-2.16l-8.86 6.88C4.42 40.64 13.64 46 24 46c6.82 0 12.98-2.26 17.77-6.08l-7.53-5.9c-2.56 1.68-5.84 2.68-9.24 2.68-6 0-11.12-3.92-13.8-9.8z" />
//             <path fill="#EA4335" d="M2.34 13.18C.84 16.14 0 19.46 0 23c0 3.54.84 6.86 2.34 9.82l8.86-6.88C10.32 24.9 10 23.48 10 22s.32-2.9.94-4.18l-8.6-6.88z" />
//           </svg>
//           Login with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginSignup;



import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  sendPasswordResetEmail,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [confirmMobileNumber, setConfirmMobileNumber] = useState("");
  const [isMobileConfirmed, setIsMobileConfirmed] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Fetch country data
  const dropdownRef = useRef(null);
  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const data = response.data.map((country) => ({
          name: country.name.common,
          code: country.idd?.root + (country.idd?.suffixes?.[0] || ""),
          flag: country.flags?.png || "",
        }));
        setCountries(data);

        // Set India as the default country
        const india = data.find((country) => country.name === "India");
        if (india) {
          setSelectedCountry(india);
        }
      } catch (error) {
        setMessage("Failed to load country data.");
        setMessageType("error");
      }
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displayMessage = (type, text) => {
    setMessageType(type);
    setMessage(text);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  const handleMobileConfirm = () => {
    if (mobileNumber !== confirmMobileNumber) {
      displayMessage("error", "Mobile numbers do not match!");
      return;
    }
    if (mobileNumber.length !== 10) {
      displayMessage("error", "Please enter a valid 10-digit mobile number!");
      return;
    }
    displayMessage("success", "Mobile number confirmed!");
    setIsMobileConfirmed(true);
  };

  const fullMobileNumber = selectedCountry?.code + mobileNumber;

  const saveUserToBackend = async (user, token) => {
    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        uid: user.uid,
        email: user.email,
        token: token,
        displayName: name || user.displayName,
        mobile_no: fullMobileNumber || user.phoneNumber,
        role_id: 2, // Replace with actual role_id
      });
      console.log("Response from saving", response);
      return response;
    } catch (error) {
      console.error("Error saving user to backend", error);
      throw error;
    }
  };

  const handleSignup = async () => {
    if (!name) {
      displayMessage("error", "Please enter your name!");
      return;
    }
    if (password !== confirmPassword) {
      displayMessage("error", "Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = userCredential._tokenResponse.idToken;
      const user = userCredential.user;
      await sendEmailVerification(user);

      displayMessage(
        "success",
        "Verification email sent! Please check your inbox."
      );

      const response = await saveUserToBackend(user, token);
      if (response.status === 201) {
        displayMessage("success", "User registered successfully!");
        setIsLogin(true);
      } else {
        displayMessage(
          "error",
          response.data.message || "Signup failed. Please try again."
        );
      }
    } catch (error) {
      displayMessage("error", "Error signing up: " + error.message);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      displayMessage("error", "Please enter your email and password!");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (!user.emailVerified) {
        displayMessage("error", "Please verify your email before logging in.");
        return;
      }

      await axios.post("http://localhost:5000/api/login", {
        token: userCredential._tokenResponse.idToken,
        uid: user.uid,
      });

      displayMessage("success", "User logged in successfully!");
    } catch (error) {
      displayMessage("error", `Login failed: ${error.message}`);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      displayMessage(
        "error",
        "Please enter your email address to reset your password!"
      );
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      displayMessage("success", "Password reset email sent!");
    } catch (error) {
      displayMessage(
        "error",
        `Error sending password reset email: ${error.message}`
      );
    }
  };

  const handleGoogleAuth = async () => {
    let num1 = "";
    if (fullMobileNumber.length > 6) num1 = fullMobileNumber;
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await axios.post("http://localhost:5000/api/g_login", {
        uid: user.uid,
        email: user.email,
        displayName: name || user.displayName,
        mobile_no: num1 || user.phoneNumber,
        role_id: 2,
        token: result._tokenResponse.idToken,
      });
      displayMessage("success", "User signed in with Google successfully!");
    } catch (error) {
      displayMessage("error", `Error signing in with Google: ${error.message}`);
    }
  };

  const handleSwitch = () => {
    // Reset all fields when switching between login and signup
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setMobileNumber("");
    setConfirmMobileNumber("");
    setIsMobileConfirmed(false);
    setIsLogin((prev) => !prev);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 bg-gray-100 sm:px-6 md:px-8">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
        {message && (
          <div
            className={`mb-4 p-2 text-center rounded ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
{!isLogin && !isMobileConfirmed && (
  <div>
    <h2 className="mb-4 text-xl font-semibold">Confirm Mobile Number</h2>

    <div className="flex items-center w-full mb-4 space-x-2">
      {/* Country Code Dropdown */}
      <div className="relative w-1/2" ref={dropdownRef}>
        <button
          className="flex items-center justify-between w-full h-12 p-2 bg-white border rounded"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          {selectedCountry ? (
            <div className="flex items-center space-x-2">
              <img
                src={selectedCountry.flag}
                alt={selectedCountry.name}
                className="w-5 h-5"
              />
              <span className="mr-2 truncate">
                 {selectedCountry.code}
              </span>
            </div>
          ) : (
            <span>Select</span>
          )}
          <span className="ml-2">&#9660;</span>
        </button>
        {isDropdownOpen && (
          <ul className="absolute z-10 w-full mt-2 overflow-y-auto bg-white border rounded shadow-lg max-h-60">
            {countries.map((country, index) => (
              <li
                key={index}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSelectedCountry(country);
                  setDropdownOpen(false);
                }}
              >
                <img
                  src={country.flag}
                  alt={country.name}
                  className="w-5 h-5 mr-2"
                />
                <span>({country.name} {country.code})</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mobile Number Input */}
      <input
        type="password"
        placeholder="Mobile Number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        className="w-1/2 h-12 p-2 border rounded"
        maxLength="10"
      />
    </div>

    {/* Confirm Mobile Number Input */}
    <input
      type="text"
      placeholder="Confirm Mobile Number"
      value={confirmMobileNumber}
      onChange={(e) => setConfirmMobileNumber(e.target.value)}
      className="w-full h-12 p-2 mb-4 border rounded"
      maxLength="10"
    />

    {/* Confirm Button */}
    <button
      className="w-full h-12 py-2 text-white bg-blue-500 rounded"
      onClick={handleMobileConfirm}
    >
      Confirm Mobile Number
    </button>

    {/* Footer */}
    <footer className="flex items-center justify-center mt-4 space-x-2 text-center text-gray-500">
      <p>Already have an account?</p>
      <button className="text-blue-500" onClick={() => handleSwitch()}>
        Login
      </button>
    </footer>
  </div>
)}




        {/* Login/Signup */}
        {(isLogin || isMobileConfirmed) && (
          <div>
            <h2 className="mb-4 text-xl font-semibold">
              {isLogin ? "Login" : "Sign Up"}
            </h2>
            {!isLogin && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
              />
            )}
            <button
              className="w-full py-2 text-white bg-blue-500 rounded"
              onClick={isLogin ? handleLogin : handleSignup}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
            {isLogin && (
              <button
                className="w-full py-2 mt-2 bg-gray-300 rounded"
                onClick={handleForgotPassword}
              >
                Forgot Password
              </button>
            )}
            <div className="mt-4 text-center">
              <button
                className="w-full py-2 text-white bg-red-500 rounded"
                onClick={handleGoogleAuth}
              >
                {isLogin ? "Login with Google" : "Sign Up with Google"}
              </button>
            </div>
            <div className="mt-4 text-center">
              <button className="text-blue-500" onClick={() => handleSwitch()}>
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Login"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignupSigninComponent;
