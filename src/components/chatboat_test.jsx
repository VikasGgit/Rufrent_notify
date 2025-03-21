
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios"; // Import axios for API calls

// const messageMap = {
//     "start": [
//         "👋 Welcome to RufRent - your one-stop solution for hassle-free renting and posting! Need help? Don't hesitate!\n\n",
//         "Enter : 1 for help in Posting a Property 🏡, " +
//         "Enter : 2 for help in Finding a Property 🔍, " +
//         "Enter : 3 for Contacting Us 📞, " +
//         "Enter : 4 for your favourite property, " +
//         "Enter : 0 to request a call back from our dedicated manager."
//     ],
//     "1": [
//         "📌 To Post Your Property please follow below link and steps: ",
//         "1️⃣ Sign up/Login to your account.",
//         "2️⃣ Visit this link or Post Property Button on Navbar after Signing: https://www.rufrent.com/user/postProperties",
//         "3️⃣ Fill in details (rent, location, images, etc.).",
//         "4️⃣ Click 'Submit' ✅",
//         "For any other details enter : " +
//         "1 for help in Posting a Property, " +
//         "2 for help in Finding a Property, " +
//         "3 for Contacting Us, " +
//         "4 for favorites property, " +
//         "0 to request a call back from our dedicated manager."
//     ],
//     "2": [
//         "🔍 How to Find a Property please follow link and steps: ",
//         "1️⃣ Visit Link: https://www.rufrent.com/user-landing",
//         "2️⃣ Apply filters (budget, location, type).",
//         "3️⃣ Click on a listing to view details.",
//         "For any other details enter : " +
//         "1 for help in Posting a Property, " +
//         "2 for help in Finding a Property, " +
//         "3 for Contacting Us, " +
//         "4 for favorites property, " +
//         "0 to request a call back from our dedicated manager."
//     ],
//     "3": [
//         "Please follow the below link: ",
//         "Contact Us: https://www.rufrent.com/contact_us 📞",
//         "For any other details enter : " +
//         "1 for help in Posting a Property, " +
//         "2 for help in Finding a Property, " +
//         "3 for Contacting Us, " +
//         "4 for favorites property, " +
//         "0 to request a call back from our dedicated manager."
//     ],
//     "4": [
//         "📌 To find your favourites Property please follow below steps and link: ",
//         "1️⃣ Sign up/Login to your account.",
//         "2️⃣ Visit this link after Signing: https://www.rufrent.com/user/myconnection",
//         "For any other details enter : " +
//         "1 for help in Posting a Property, " +
//         "2 for help in Finding a Property, " +
//         "3 for Contacting Us, " +
//         "4 for favorites property, " +
//         "0 to request a call back from our dedicated manager."
//     ],
//     "0": [
//         "Please fill out the form below so we can assist you further."
//     ],
// };

// const Chatbot = () => {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState("");
//     const [isTyping, setIsTyping] = useState(false);
//     const [showForm, setShowForm] = useState(false);
//     const [formData, setFormData] = useState({
//         name: "",
//         city: "",
//         mobile_no: "",
//         time_slot: ""
//     });
//     const chatRef = useRef(null);
//     const isMounted = useRef(false);

//     useEffect(() => {
//         if (!isMounted.current) {
//             isMounted.current = true;
//             sendMessage("start");
//         }
//     }, []);

//     useEffect(() => {
//         if (chatRef.current) {
//             chatRef.current.scrollTo({
//                 top: chatRef.current.scrollHeight,
//                 behavior: "smooth",
//             });
//         }
//     }, [messages]);

//     const formatMessage = (text) => {
//         const urlRegex = /(https?:\/\/[^\s]+)/g;
//         return text.split(urlRegex).map((part, index) =>
//             urlRegex.test(part) ? (
//                 <a
//                     key={index}
//                     href={part}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline hover:text-blue-800"
//                 >
//                     {part}
//                 </a>
//             ) : (
//                 part
//             )
//         );
//     };

//     const sendMessage = (key) => {
//         if (!messageMap[key]) {
//             setMessages((prev) => [
//                 ...prev,
//                 { type: "user", text: key },
//                 {
//                     type: "bot", text: "Oops! I am still learning. Please type" +
//                     " 1 for help in Posting a Property, " +
//                     " 2 for help in Finding a Property, " +
//                     " 3 for Contacting Us, " +
//                     " 4 for favorites property, " +
//                     " 0 to request a call back from our dedicated manager."
//                 },
//             ]);
//             return;
//         }

//         setMessages((prev) => [...prev, { type: "user", text: key }]);
//         setIsTyping(true);

//         setTimeout(() => {
//             const botMessages = messageMap[key].map((line) => ({ type: "bot", text: line }));
//             setMessages((prev) => [...prev, ...botMessages]);
//             setIsTyping(false);
//             if (key === "0") {
//                 setShowForm(true);
//             }
//         }, 1000); // Simulate typing delay
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === "Enter" && input.trim() !== "" && !isTyping) {
//             sendMessage(input.trim());
//             setInput("");
//         }
//     };

//     const handleFormChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:5000/api/addChatbotEntry", formData, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//             console.log("response: ", response);
//             if (response.status === 201) {
//                 setMessages((prev) => [
//                     ...prev,
//                     { type: "bot", text: "Thank you! We will contact you shortly." }
//                 ]);
//                 setShowForm(false);
//             } 
//             else {
//                 setMessages((prev) => [
//                     ...prev,
//                     { type: "bot", text: "Failed to submit your details. Please try again later." }
//                 ]);
//                 // Keep the form open if the submission fails
//                 setShowForm(true);
//             }
//         } catch (error) {
//             console.error("Error submitting form:", error);
//             setMessages((prev) => [
//                 ...prev,
//                 { type: "bot", text: error?.response?.data?.message|| "An error occurred. Please try again later." }
//             ]);
//             // Keep the form open if an error occurs
//             setShowForm(true);
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen p-4">
//         {/* <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-blue-100 to-white"> */}
//             <div className="w-full max-w-2xl p-5 bg-white shadow-2xl rounded-xl">
//                 <h2 className="text-xl font-bold text-center text-blue-700">💬 Rufi : Chatbot</h2>

//                 {/* Chat Messages Container */}
//                 <div
//                     ref={chatRef}
//                     className="p-4 mt-4 space-y-3 overflow-y-auto border rounded-lg shadow-inner h-[400px] bg-gray-50"
//                     style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar
//                 >
//                     {messages.map((msg, index) => (
//                         <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
//                             <div
//                                 className={`p-3 max-w-xs rounded-lg shadow-md text-sm ${
//                                     msg.type === "user"
//                                         ? "bg-blue-500 text-white rounded-br-none"
//                                         : "bg-gray-200 text-gray-800 rounded-bl-none"
//                                 }`}
//                             >
//                                 {formatMessage(msg.text)}
//                             </div>
//                         </div>
//                     ))}
//                     {isTyping && (
//                         <div className="flex justify-start">
//                             <div className="max-w-xs p-3 text-sm text-gray-800 bg-gray-200 rounded-lg rounded-bl-none shadow-md">
//                                 ⌛ Typing...
//                             </div>
//                         </div>
//                     )}
//                     {showForm && (
//                         <div className="flex justify-start">
//                             <div className="max-w-xs p-3 text-sm text-gray-800 bg-gray-200 rounded-lg rounded-bl-none shadow-md">
//                                 <form onSubmit={handleFormSubmit}>
//                                     <input
//                                         type="text"
//                                         name="name"
//                                         placeholder="Name"
//                                         value={formData.name}
//                                         onChange={handleFormChange}
//                                         required
//                                         className="w-full p-2 mb-2 border rounded"
//                                     />
//                                     <input
//                                         type="text"
//                                         name="city"
//                                         placeholder="City"
//                                         value={formData.city}
//                                         onChange={handleFormChange}
//                                         required
//                                         className="w-full p-2 mb-2 border rounded"
//                                     />
//                                     <input
//                                         type="text"
//                                         name="mobile_no"
//                                         placeholder="Mobile Number"
//                                         value={formData.mobile_no}
//                                         onChange={handleFormChange}
//                                         required
//                                         className="w-full p-2 mb-2 border rounded"
//                                     />
//                                     <input
//                                         type="text"
//                                         name="time_slot"
//                                         placeholder="Preferred Time Slot"
//                                         value={formData.time_slot}
//                                         onChange={handleFormChange}
//                                         required
//                                         className="w-full p-2 mb-2 border rounded"
//                                     />
//                                     <button
//                                         type="submit"
//                                         className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
//                                     >
//                                         Submit
//                                     </button>
//                                 </form>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Input and Send Button */}
//                 <div className="flex mt-4">
//                     <input
//                         type="text"
//                         className="flex-1 p-3 border rounded-l-lg focus:outline-none focus:ring focus:border-blue-400"
//                         placeholder="Type your message..."
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                         disabled={isTyping} // Disable input when bot is typing
//                     />
//                     <button
//                         className={`p-3 text-white rounded-r-lg ${
//                             isTyping ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
//                         } transition-colors duration-200`}
//                         disabled={isTyping}
//                         onClick={() => {
//                             if (input.trim() !== "") {
//                                 sendMessage(input.trim());
//                                 setInput("");
//                             }
//                         }}
//                     >
//                         {/* New Send Icon SVG */}
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="w-6 h-6"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                         >
//                             <line x1="22" y1="2" x2="11" y2="13" />
//                             <polygon points="22 2 15 22 11 13 2 9 22 2" />
//                         </svg>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const ChatbotModal = ({ isOpen, onClose }) => {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg">
//                 {/* Close Button */}
//                 <button
//                     onClick={onClose}
//                     className="absolute p-2 text-gray-600 top-4 right-4 hover:text-gray-800"
//                 >
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="w-6 h-6"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M6 18L18 6M6 6l12 12"
//                         />
//                     </svg>
//                 </button>

//                 {/* Chatbot Component */}
//                 <Chatbot />
//             </div>
//         </div>
//     );
// };

// export default ChatbotModal;



// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios"; // Import axios for API calls

// const messageMap = {
//     "start": [
//         "👋 Welcome to RufRent - your one-stop solution for hassle-free renting and posting! Need help? Don't hesitate!\n\n",
//         "Enter : 1 for help in Posting a Property 🏡, " +
//         "Enter : 2 for help in Finding a Property 🔍, " +
//         "Enter : 3 for Contacting Us 📞, " +
//         "Enter : 4 for your favourite property, " +
//         "Enter : 0 to request a call back from our dedicated manager."
//     ],
//     "1": [
//         "📌 To Post Your Property please follow below link and steps: ",
//         "1️⃣ Sign up/Login to your account.",
//         "2️⃣ Visit this link or Post Property Button on Navbar after Signing: https://www.rufrent.com/user/postProperties",
//         "3️⃣ Fill in details (rent, location, images, etc.).",
//         "4️⃣ Click 'Submit' ✅",
//         "For any other details enter : " +
//         "1 for help in Posting a Property, " +
//         "2 for help in Finding a Property, " +
//         "3 for Contacting Us, " +
//         "4 for favorites property, " +
//         "0 to request a call back from our dedicated manager."
//     ],
//     "2": [
//         "🔍 How to Find a Property please follow link and steps: ",
//         "1️⃣ Visit Link: https://www.rufrent.com/user-landing",
//         "2️⃣ Apply filters (budget, location, type).",
//         "3️⃣ Click on a listing to view details.",
//         "For any other details enter : " +
//         "1 for help in Posting a Property, " +
//         "2 for help in Finding a Property, " +
//         "3 for Contacting Us, " +
//         "4 for favorites property, " +
//         "0 to request a call back from our dedicated manager."
//     ],
//     "3": [
//         "Please follow the below link: ",
//         "Contact Us: https://www.rufrent.com/contact_us 📞",
//         "For any other details enter : " +
//         "1 for help in Posting a Property, " +
//         "2 for help in Finding a Property, " +
//         "3 for Contacting Us, " +
//         "4 for favorites property, " +
//         "0 to request a call back from our dedicated manager."
//     ],
//     "4": [
//         "📌 To find your favourites Property please follow below steps and link: ",
//         "1️⃣ Sign up/Login to your account.",
//         "2️⃣ Visit this link after Signing: https://www.rufrent.com/user/myconnection",
//         "For any other details enter : " +
//         "1 for help in Posting a Property, " +
//         "2 for help in Finding a Property, " +
//         "3 for Contacting Us, " +
//         "4 for favorites property, " +
//         "0 to request a call back from our dedicated manager."
//     ],
//     "0": [
//         "Please fill out the form below so we can assist you further."
//     ],
// };

// const Chatbot = () => {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState("");
//     const [isTyping, setIsTyping] = useState(false);
//     const [showForm, setShowForm] = useState(false);
//     const [formData, setFormData] = useState({
//         name: "",
//         city: "",
//         mobile_no: "",
//         time_slot: ""
//     });
//     const [errors, setErrors] = useState({});
//     const chatRef = useRef(null);
//     const isMounted = useRef(false);

//     useEffect(() => {
//         if (!isMounted.current) {
//             isMounted.current = true;
//             sendMessage("start");
//         }
//     }, []);

//     useEffect(() => {
//         if (chatRef.current) {
//             chatRef.current.scrollTo({
//                 top: chatRef.current.scrollHeight,
//                 behavior: "smooth",
//             });
//         }
//     }, [messages]);

//     const formatMessage = (text) => {
//         const urlRegex = /(https?:\/\/[^\s]+)/g;
//         return text.split(urlRegex).map((part, index) =>
//             urlRegex.test(part) ? (
//                 <a
//                     key={index}
//                     href={part}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline hover:text-blue-800"
//                 >
//                     {part}
//                 </a>
//             ) : (
//                 part
//             )
//         );
//     };

//     const sendMessage = (key) => {
//         if (!messageMap[key]) {
//             setMessages((prev) => [
//                 ...prev,
//                 { type: "user", text: key },
//                 {
//                     type: "bot", text: "Oops! I am still learning. Please type" +
//                     " 1 for help in Posting a Property, " +
//                     " 2 for help in Finding a Property, " +
//                     " 3 for Contacting Us, " +
//                     " 4 for favorites property, " +
//                     " 0 to request a call back from our dedicated manager."
//                 },
//             ]);
//             return;
//         }

//         setMessages((prev) => [...prev, { type: "user", text: key }]);
//         setIsTyping(true);

//         setTimeout(() => {
//             const botMessages = messageMap[key].map((line) => ({ type: "bot", text: line }));
//             setMessages((prev) => [...prev, ...botMessages]);
//             setIsTyping(false);
//             if (key === "0") {
//                 setShowForm(true);
//             }
//         }, 1000); // Simulate typing delay
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === "Enter" && input.trim() !== "" && !isTyping) {
//             sendMessage(input.trim());
//             setInput("");
//         }
//     };

//     const handleFormChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//         // Clear the error message when the user starts typing again
//         setErrors({
//             ...errors,
//             [name]: ""
//         });
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         if (!formData.name.trim()) newErrors.name = "Name is required";
//         if (!formData.city.trim()) newErrors.city = "City is required";
//         if (!formData.mobile_no.trim()) newErrors.mobile_no = "Mobile number is required";
//         if (!formData.time_slot.trim()) newErrors.time_slot = "Preferred time slot is required";
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;

//         try {
//             const response = await axios.post("http://localhost:5000/api/addChatbotEntry", formData, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//             console.log("response: ", response);
//             if (response.status === 201) {
//                 setMessages((prev) => [
//                     ...prev,
//                     { type: "bot", text: "Thank you! We will contact you shortly." }
//                 ]);
//                 setShowForm(false);
//             } 
//             else {
//                 setMessages((prev) => [
//                     ...prev,
//                     { type: "bot", text: "Failed to submit your details. Please try again later." }
//                 ]);
//                 // Keep the form open if the submission fails
//                 setShowForm(true);
//             }
//         } catch (error) {
//             console.error("Error submitting form:", error);
//             setMessages((prev) => [
//                 ...prev,
//                 { type: "bot", text: error?.response?.data?.message|| "An error occurred. Please try again later." }
//             ]);
//             // Keep the form open if an error occurs
//             setShowForm(true);
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen p-4">
//             <div className="w-full max-w-2xl p-5 bg-white shadow-2xl rounded-xl">
//                 <h2 className="text-xl font-bold text-center text-blue-700">💬 Rufi : Chatbot</h2>

//                 {/* Chat Messages Container */}
//                 <div
//                     ref={chatRef}
//                     className="p-4 mt-4 space-y-3 overflow-y-auto border rounded-lg shadow-inner h-[400px] bg-gray-50"
//                     style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar
//                 >
//                     {messages.map((msg, index) => (
//                         <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
//                             <div
//                                 className={`p-3 max-w-xs rounded-lg shadow-md text-sm ${
//                                     msg.type === "user"
//                                         ? "bg-blue-500 text-white rounded-br-none"
//                                         : "bg-gray-200 text-gray-800 rounded-bl-none"
//                                 }`}
//                             >
//                                 {formatMessage(msg.text)}
//                             </div>
//                         </div>
//                     ))}
//                     {isTyping && (
//                         <div className="flex justify-start">
//                             <div className="max-w-xs p-3 text-sm text-gray-800 bg-gray-200 rounded-lg rounded-bl-none shadow-md">
//                                 ⌛ Typing...
//                             </div>
//                         </div>
//                     )}
//                     {showForm && (
//                         <div className="flex justify-start">
//                             <div className="max-w-md p-3 text-gray-800 bg-gray-200 rounded-lg rounded-bl-none shadow-md text-md">
//                                 <form onSubmit={handleFormSubmit}>
//                                     <div className="mb-2">
//                                         <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name *</label>
//                                         <input
//                                             type="text"
//                                             name="name"
//                                             placeholder="Name"
//                                             value={formData.name}
//                                             onChange={handleFormChange}
//                                             required
//                                             className="w-full p-2 mt-1 border rounded"
//                                         />
//                                         {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
//                                     </div>
//                                     <div className="mb-2">
//                                         <label htmlFor="city" className="block text-sm font-medium text-gray-700">City *</label>
//                                         <input
//                                             type="text"
//                                             name="city"
//                                             placeholder="City"
//                                             value={formData.city}
//                                             onChange={handleFormChange}
//                                             required
//                                             className="w-full p-2 mt-1 border rounded"
//                                         />
//                                         {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
//                                     </div>
//                                     <div className="mb-2">
//                                         <label htmlFor="mobile_no" className="block text-sm font-medium text-gray-700">Mobile Number *</label>
//                                         <input
//                                             type="text"
//                                             name="mobile_no"
//                                             placeholder="Mobile Number"
//                                             value={formData.mobile_no}
//                                             onChange={handleFormChange}
//                                             required
//                                             className="w-full p-2 mt-1 border rounded"
//                                         />
//                                         {errors.mobile_no && <p className="text-sm text-red-500">{errors.mobile_no}</p>}
//                                     </div>
//                                     <div className="mb-2">
//                                         <label htmlFor="time_slot" className="block text-sm font-medium text-gray-700">Preferred Time Slot *</label>
//                                         <input
//                                             type="text"
//                                             name="time_slot"
//                                             placeholder="Preferred Time Slot"
//                                             value={formData.time_slot}
//                                             onChange={handleFormChange}
//                                             required
//                                             className="w-full p-2 mt-1 border rounded"
//                                         />
//                                         {errors.time_slot && <p className="text-sm text-red-500">{errors.time_slot}</p>}
//                                     </div>
//                                     <button
//                                         type="submit"
//                                         className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
//                                     >
//                                         Submit
//                                     </button>
//                                 </form>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Input and Send Button */}
//                 <div className="flex mt-4">
//                     <input
//                         type="text"
//                         className="flex-1 p-3 border rounded-l-lg focus:outline-none focus:ring focus:border-blue-400"
//                         placeholder="Type your message..."
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                         disabled={isTyping} // Disable input when bot is typing
//                     />
//                     <button
//                         className={`p-3 text-white rounded-r-lg ${
//                             isTyping ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
//                         } transition-colors duration-200`}
//                         disabled={isTyping}
//                         onClick={() => {
//                             if (input.trim() !== "") {
//                                 sendMessage(input.trim());
//                                 setInput("");
//                             }
//                         }}
//                     >
//                         {/* New Send Icon SVG */}
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="w-6 h-6"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                         >
//                             <line x1="22" y1="2" x2="11" y2="13" />
//                             <polygon points="22 2 15 22 11 13 2 9 22 2" />
//                         </svg>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const ChatbotModal = ({ isOpen, onClose }) => {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg">
//                 {/* Close Button */}
//                 <button
//                     onClick={onClose}
//                     className="absolute p-2 text-gray-600 top-4 right-4 hover:text-gray-800"
//                 >
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="w-6 h-6"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M6 18L18 6M6 6l12 12"
//                         />
//                     </svg>
//                 </button>

//                 {/* Chatbot Component */}
//                 <Chatbot />
//             </div>
//         </div>
//     );
// };

// export default ChatbotModal;


// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios"; // Import axios for API calls

// const messageMap = {
//     "start": [
//         "👋 Welcome to RufRent - your one-stop solution for hassle-free renting and posting! Need help? Don't hesitate!\n\n",
//         "Enter : 1 for help in Posting a Property 🏡, " +
//         "Enter : 2 for help in Finding a Property 🔍, " +
//         "Enter : 3 for Contacting Us 📞, " +
//         "Enter : 4 for your favourite property, " +
//         "Enter : 0 to request a call back from our dedicated manager."
//     ],
//     "1": [
//         "📌 To Post Your Property please follow below link and steps: ",
//         "1️⃣ Sign up/Login to your account.",
//         "2️⃣ Visit this link or Post Property Button on Navbar after Signing: https://www.rufrent.com/user/postProperties",
//         "3️⃣ Fill in details (rent, location, images, etc.).",
//         "4️⃣ Click 'Submit' ✅",
//         "For any other details enter : " +
//         "1 for help in Posting a Property, " +
//         "2 for help in Finding a Property, " +
//         "3 for Contacting Us, " +
//         "4 for favorites property, " +
//         "0 to request a call back from our dedicated manager."
//     ],
//     "2": [
//         "🔍 How to Find a Property please follow link and steps: ",
//         "1️⃣ Visit Link: https://www.rufrent.com/user-landing",
//         "2️⃣ Apply filters (budget, location, type).",
//         "3️⃣ Click on a listing to view details.",
//         "For any other details enter : " +
//         "1 for help in Posting a Property, " +
//         "2 for help in Finding a Property, " +
//         "3 for Contacting Us, " +
//         "4 for favorites property, " +
//         "0 to request a call back from our dedicated manager."
//     ],
//     "3": [
//         "Please follow the below link: ",
//         "Contact Us: https://www.rufrent.com/contact_us 📞",
//         "For any other details enter : " +
//         "1 for help in Posting a Property, " +
//         "2 for help in Finding a Property, " +
//         "3 for Contacting Us, " +
//         "4 for favorites property, " +
//         "0 to request a call back from our dedicated manager."
//     ],
//     "4": [
//         "📌 To find your favourites Property please follow below steps and link: ",
//         "1️⃣ Sign up/Login to your account.",
//         "2️⃣ Visit this link after Signing: https://www.rufrent.com/user/myconnection",
//         "For any other details enter : " +
//         "1 for help in Posting a Property, " +
//         "2 for help in Finding a Property, " +
//         "3 for Contacting Us, " +
//         "4 for favorites property, " +
//         "0 to request a call back from our dedicated manager."
//     ],
//     "0": [
//         "Please fill out the form below so we can assist you further."
//     ],
// };

// const Chatbot = () => {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState("");
//     const [isTyping, setIsTyping] = useState(false);
//     const [showForm, setShowForm] = useState(false);
//     const [formData, setFormData] = useState({
//         name: "",
//         city: "",
//         mobile_no: "",
//         time_slot: ""
//     });
//     const [errors, setErrors] = useState({});
//     const [isFormSubmitting, setIsFormSubmitting] = useState(false);
//     const chatRef = useRef(null);
//     const isMounted = useRef(false);

//     useEffect(() => {
//         if (!isMounted.current) {
//             isMounted.current = true;
//             sendMessage("start");
//         }
//     }, []);

//     useEffect(() => {
//         if (chatRef.current) {
//             chatRef.current.scrollTo({
//                 top: chatRef.current.scrollHeight,
//                 behavior: "smooth",
//             });
//         }
//     }, [messages]);

//     const formatMessage = (text) => {
//         const urlRegex = /(https?:\/\/[^\s]+)/g;
//         return text.split(urlRegex).map((part, index) =>
//             urlRegex.test(part) ? (
//                 <a
//                     key={index}
//                     href={part}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline hover:text-blue-800"
//                 >
//                     {part}
//                 </a>
//             ) : (
//                 part
//             )
//         );
//     };

//     const sendMessage = (key) => {
//         if (!messageMap[key]) {
//             setMessages((prev) => [
//                 ...prev,
//                 { type: "user", text: key },
//                 {
//                     type: "bot", text: "Oops! I am still learning. Please type" +
//                     " 1 for help in Posting a Property, " +
//                     " 2 for help in Finding a Property, " +
//                     " 3 for Contacting Us, " +
//                     " 4 for favorites property, " +
//                     " 0 to request a call back from our dedicated manager."
//                 },
//             ]);
//             return;
//         }

//         setMessages((prev) => [...prev, { type: "user", text: key }]);
//         setIsTyping(true);

//         setTimeout(() => {
//             const botMessages = messageMap[key].map((line) => ({ type: "bot", text: line }));
//             setMessages((prev) => [...prev, ...botMessages]);
//             setIsTyping(false);
//             if (key === "0") {
//                 setShowForm(true);
//             }
//         }, 1000); // Simulate typing delay
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === "Enter" && input.trim() !== "" && !isTyping && !showForm) {
//             sendMessage(input.trim());
//             setInput("");
//         }
//     };

//     const handleFormChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//         // Clear the error message when the user starts typing again
//         setErrors({
//             ...errors,
//             [name]: ""
//         });
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         if (!formData.name.trim()) newErrors.name = "Name is required";
//         if (!formData.city.trim()) newErrors.city = "City is required";
//         if (!formData.mobile_no.trim()) newErrors.mobile_no = "Mobile number is required";
//         if (!formData.time_slot.trim()) newErrors.time_slot = "Preferred time slot is required";
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;

//         setIsFormSubmitting(true);
//         try {
//             const response = await axios.post("http://localhost:5000/api/addChatbotEntry", formData, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//             console.log("response: ", response);
//             if (response.status === 201) {
//                 setMessages((prev) => [
//                     ...prev,
//                     { type: "bot", text: "Thank you! We will contact you shortly." }
//                 ]);
//                 setShowForm(false);
//                 alert("Thank you!, we will contact you soon")
//             } 
//             else {
//                 setMessages((prev) => [
//                     ...prev,
//                     { type: "bot", text: "Failed to submit your details. Please try again later." }
//                 ])
//                 alert("Failed to submit your details. Please try again later");
//                 // Keep the form open if the submission fails
//                 setShowForm(true);
//             }
//         } catch (error) {
//             console.error("Error submitting form:", error);
//             setMessages((prev) => [
//                 ...prev,
//                 { type: "bot", text: error?.response?.data?.message|| "An error occurred. Please try again later." }
//             ]);
//             alert(error?.response?.data?.message|| "An error occurred. Please try again later.");
//             // Keep the form open if an error occurs
//             setShowForm(true);
//         } finally {
//             setIsFormSubmitting(false);
//         }
//     };

//     const handleCloseForm = () => {
//         setShowForm(false);
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen p-4">
//             <div className="w-full max-w-2xl p-5 bg-white shadow-2xl rounded-xl">

//                 {/* Chat Messages Container */}
//                 <div
//                     ref={chatRef}
//                     className="p-4 mt-4 space-y-3 overflow-y-auto border rounded-lg shadow-inner h-[400px] bg-gray-50"
//                     style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar
//                 >
//                     {messages.map((msg, index) => (
//                         <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
//                             <div
//                                 className={`p-3 max-w-xs rounded-lg shadow-md text-sm ${
//                                     msg.type === "user"
//                                         ? "bg-blue-500 text-white rounded-br-none"
//                                         : "bg-gray-200 text-gray-800 rounded-bl-none"
//                                 }`}
//                             >
//                                 {formatMessage(msg.text)}
//                             </div>
//                         </div>
//                     ))}
//                     {isTyping && (
//                         <div className="flex justify-start">
//                             <div className="max-w-xs p-3 text-sm text-gray-800 bg-gray-200 rounded-lg rounded-bl-none shadow-md">
//                                 ⌛ Typing...
//                             </div>
//                         </div>
//                     )}
//                     {showForm && (
//                         <div className="flex justify-start">
//                             <div className="w-full max-w-md p-3 text-gray-800 bg-gray-200 rounded-lg rounded-bl-none shadow-md text-md">
//                                 <div className="flex items-center justify-between mb-4">
//                                     <h3 className="text-lg font-semibold">Request a Callback</h3>
//                                     <button
//                                         onClick={handleCloseForm}
//                                         className="p-1 text-gray-600 hover:text-gray-800"
//                                     >
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             className="w-6 h-6"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth={2}
//                                                 d="M6 18L18 6M6 6l12 12"
//                                             />
//                                         </svg>
//                                     </button>
//                                 </div>
//                                 <form onSubmit={handleFormSubmit}>
//                                     <div className="mb-2">
//                                         <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name *</label>
//                                         <input
//                                             type="text"
//                                             name="name"
//                                             placeholder="Name"
//                                             value={formData.name}
//                                             onChange={handleFormChange}
//                                             required
//                                             className="w-full p-2 mt-1 border rounded"
//                                         />
//                                         {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
//                                     </div>
//                                     <div className="mb-2">
//                                         <label htmlFor="city" className="block text-sm font-medium text-gray-700">City *</label>
//                                         <input
//                                             type="text"
//                                             name="city"
//                                             placeholder="City"
//                                             value={formData.city}
//                                             onChange={handleFormChange}
//                                             required
//                                             className="w-full p-2 mt-1 border rounded"
//                                         />
//                                         {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
//                                     </div>
//                                     <div className="mb-2">
//                                         <label htmlFor="mobile_no" className="block text-sm font-medium text-gray-700">Mobile Number *</label>
//                                         <input
//                                             type="text"
//                                             name="mobile_no"
//                                             placeholder="Mobile Number"
//                                             value={formData.mobile_no}
//                                             onChange={handleFormChange}
//                                             required
//                                             className="w-full p-2 mt-1 border rounded"
//                                         />
//                                         {errors.mobile_no && <p className="text-sm text-red-500">{errors.mobile_no}</p>}
//                                     </div>
//                                     <div className="mb-2">
//                                         <label htmlFor="time_slot" className="block text-sm font-medium text-gray-700">Preferred Time Slot *</label>
//                                         <input
//                                             type="text"
//                                             name="time_slot"
//                                             placeholder="Preferred Time Slot"
//                                             value={formData.time_slot}
//                                             onChange={handleFormChange}
//                                             required
//                                             className="w-full p-2 mt-1 border rounded"
//                                         />
//                                         {errors.time_slot && <p className="text-sm text-red-500">{errors.time_slot}</p>}
//                                     </div>
//                                     <button
//                                         type="submit"
//                                         disabled={isFormSubmitting}
//                                         className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400"
//                                     >
//                                         {isFormSubmitting ? "Submitting..." : "Submit"}
//                                     </button>
//                                 </form>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Input and Send Button */}
//                 <div className="flex mt-4">
//                     <input
//                         type="text"
//                         className="flex-1 p-3 border rounded-l-lg focus:outline-none focus:ring focus:border-blue-400"
//                         placeholder="Type your message..."
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                         disabled={isTyping || showForm} // Disable input when bot is typing or form is open
//                     />
//                     <button
//                         className={`p-3 text-white rounded-r-lg ${
//                             isTyping || showForm ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
//                         } transition-colors duration-200`}
//                         disabled={isTyping || showForm}
//                         onClick={() => {
//                             if (input.trim() !== "") {
//                                 sendMessage(input.trim());
//                                 setInput("");
//                             }
//                         }}
//                     >
//                         {/* New Send Icon SVG */}
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="w-6 h-6"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                         >
//                             <line x1="22" y1="2" x2="11" y2="13" />
//                             <polygon points="22 2 15 22 11 13 2 9 22 2" />
//                         </svg>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const ChatbotModal = ({ isOpen, onClose }) => {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg">
//             <h2 className="text-xl font-bold text-center text-blue-700">💬 Rufi : Chatbot</h2>
                
//                 {/* Close Button */}
//                 <button
//                     onClick={onClose}
//                     className="absolute p-2 text-gray-600 top-4 right-4 hover:text-gray-800"
//                 >
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="w-6 h-6"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M6 18L18 6M6 6l12 12"
//                         />
//                     </svg>
//                 </button>

//                 {/* Chatbot Component */}
//                 <Chatbot />
//             </div>
//         </div>
//     );
// };

// export default ChatbotModal;

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios"; // Import axios for API calls
// import tailwindStyles from "./tailwindStyles2";


// const messageMap = {
//     "start": [
//         "👋 Welcome to RufRent - your one-stop solution for hassle-free renting and posting! Need help? Don't hesitate!\n\n",
//         "Enter : 1 for help in Posting a Property 🏡 " ,
//         "Enter : 2 for help in Finding a Property 🔍 " ,
//         "Enter : 3 for Contacting Us 📞 " ,
//         "Enter : 4 for your favourite property " ,
//         "Enter : 0 to request a call back from our dedicated manager."
//     ],
//     "1": [
//         "📌 To Post Your Property please follow below link and steps: ",
//         "1️⃣ Sign up/Login to your account.",
//         "2️⃣ Visit this link or Post Property Button on Navbar after Signing: https://www.rufrent.com/user/postProperties",
//         "3️⃣ Fill in details (rent, location, images, etc.).",
//         "4️⃣ Click 'Submit' ✅",
//         "Enter: 9 for Main Menu",
//     ],
//     "2": [
//         "🔍 How to Find a Property please follow link and steps: ",
//         "1️⃣ Visit Link: https://www.rufrent.com/user-landing",
//         "2️⃣ Apply filters (budget, location, type).",
//         "3️⃣ Click on a listing to view details.",
//         "Enter: 9 for Main Menu",
//     ],
//     "3": [
//         "Please follow the below link: ",
//         "Contact Us: https://www.rufrent.com/contact_us 📞",
//         "For any other details enter : " +
//         "Enter: 9 for Main Menu",
//     ],
//     "4": [
//         "📌 To find your favourites Property please follow below steps and link: ",
//         "1️⃣ Sign up/Login to your account.",
//         "2️⃣ Visit this link after Signing: https://www.rufrent.com/user/myconnection",
//         "Enter: 9 for Main Menu",
//     ],
//     "9": [
//         "Enter : 1 for help in Posting a Property 🏡 ",
//         "Enter : 2 for help in Finding a Property 🔍 ",
//         "Enter : 3 for Contacting Us 📞 ",
//         "Enter : 4 for your favourite property " ,
//         "Enter : 0 to request a call back from our dedicated manager."
//     ],
//     "0": [
//         "Please fill out the form below so we can assist you further."
//     ],
// };

// const Chatbot = () => {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState("");
//     const [isTyping, setIsTyping] = useState(false);
//     const [showForm, setShowForm] = useState(false);
//     const [formData, setFormData] = useState({
//         name: "",
//         city: "",
//         mobile_no: "",
//         time_slot: "",
//         purpose: "" // New field for purpose of contact
//     });
//     const [errors, setErrors] = useState({});
//     const [isFormSubmitting, setIsFormSubmitting] = useState(false);
//     const chatRef = useRef(null);
//     const isMounted = useRef(false);

//     useEffect(() => {
//         if (!isMounted.current) {
//             isMounted.current = true;
//             sendMessage("start");
//         }
//     }, []);

//     useEffect(() => {
//         if (chatRef.current) {
//             chatRef.current.scrollTo({
//                 top: chatRef.current.scrollHeight,
//                 behavior: "smooth",
//             });
//         }
//     }, [messages]);

//     const formatMessage = (text) => {
//         const urlRegex = /(https?:\/\/[^\s]+)/g;
//         return text.split(urlRegex).map((part, index) =>
//             urlRegex.test(part) ? (
//                 <a
//                     key={index}
//                     href={part}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline hover:text-blue-800"
//                 >
//                     {part}
//                 </a>
//             ) : (
//                 part
//             )
//         );
//     };

//     const sendMessage = (key) => {
//         if (!messageMap[key]) {
//             setMessages((prev) => [
//                 ...prev,
//                 { type: "user", text: key },
//                 {
//                     type: "bot", text: "Oops! I am still learning. Please type" +
//                     " 1 for help in Posting a Property, " +
//                     " 2 for help in Finding a Property, " +
//                     " 3 for Contacting Us, " +
//                     " 4 for favorites property, " +
//                     " 0 to request a call back from our dedicated manager."
//                 },
//             ]);
//             return;
//         }

//         setMessages((prev) => [...prev, { type: "user", text: key }]);
//         setIsTyping(true);

//         setTimeout(() => {
//             const botMessages = messageMap[key].map((line) => ({ type: "bot", text: line }));
//             setMessages((prev) => [...prev, ...botMessages]);
//             setIsTyping(false);
//             if (key === "0") {
//                 setShowForm(true);
//             }
//         }, 1000); // Simulate typing delay
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === "Enter" && input.trim() !== "" && !isTyping && !showForm) {
//             sendMessage(input.trim());
//             setInput("");
//         }
//     };

//     const handleFormChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//         // Clear the error message when the user starts typing again
//         setErrors({
//             ...errors,
//             [name]: ""
//         });
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         if (!formData.name.trim()) newErrors.name = "Name is required";
//         if (!formData.city.trim()) newErrors.city = "City is required";
//         if (!formData.mobile_no.trim()) newErrors.mobile_no = "Mobile number is required";
//         if (!formData.time_slot.trim()) newErrors.time_slot = "Preferred time slot is required";
//         if (!formData.purpose.trim()) newErrors.purpose = "Purpose of contact is required";
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;

//         setIsFormSubmitting(true);
//         try {
//             const response = await axios.post("http://localhost:5000/api/addChatbotEntry", formData, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//             console.log("response: ", response);
//             if (response.status === 201) {
//                 setMessages((prev) => [
//                     ...prev,
//                     { type: "bot", text: "Thank you! We will contact you shortly." }
//                 ]);
//                 setShowForm(false);
//                 alert("Thank you!, we will contact you soon")
//             } 
//             else {
//                 setMessages((prev) => [
//                     ...prev,
//                     { type: "bot", text: "Failed to submit your details. Please try again later." }
//                 ])
//                 alert("Failed to submit your details. Please try again later");
//                 // Keep the form open if the submission fails
//                 setShowForm(true);
//             }
//         } catch (error) {
//             console.error("Error submitting form:", error);
//             setMessages((prev) => [
//                 ...prev,
//                 { type: "bot", text: error?.response?.data?.message|| "An error occurred. Please try again later." }
//             ]);
//             alert(error?.response?.data?.message|| "An error occurred. Please try again later.");
//             // Keep the form open if an error occurs
//             setShowForm(true);
//         } finally {
//             setIsFormSubmitting(false);
//         }
//     };

//     const handleCloseForm = () => {
//         setShowForm(false);
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen p-4">
//             <div className="w-full max-w-2xl p-5 bg-white shadow-2xl rounded-xl">
//          {/* <h2 className=`${tailwindStyles.heading_3}`> Rufi : Chatbot</h2> */}
//          <h2 className={tailwindStyles.heading_2}>Rufi : Chatbot</h2>

//                 {/* Chat Messages Container */}
//                 <div
//                     ref={chatRef}
//                     className="p-4 mt-4 space-y-3 overflow-y-auto border rounded-lg shadow-inner h-[400px] bg-gray-50"
//                     style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar
//                 >
//                     {messages.map((msg, index) => (
//                         <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
//                             <div
//                                 className={`p-3 max-w-xs rounded-lg shadow-md  ${tailwindStyles.paragraph} ${
//                                     msg.type === "user"
//                                         ? `bg-blue-500 text-white rounded-br-none `
//                                         : "bg-gray-200 text-gray-800 rounded-bl-none"
//                                 }`}
//                             >
//                                 {formatMessage(msg.text)}
//                             </div>
//                         </div>
//                     ))}
//                     {isTyping && (
//                         <div className="flex justify-start">
//                             <div className="max-w-xs p-3 text-sm text-gray-800 bg-gray-200 rounded-lg rounded-bl-none shadow-md">
//                                 ⌛ Typing...
//                             </div>
//                         </div>
//                     )}
//                     {showForm && (
//                         <div className="flex justify-start">
//                             <div className="w-full max-w-md p-3 text-gray-800 bg-gray-200 rounded-lg rounded-bl-none shadow-md text-md">
//                                 <div className="flex items-center justify-between mb-4">
//                                     <h3 className="text-lg font-semibold">Request a Callback</h3>
//                                     <button
//                                         onClick={handleCloseForm}
//                                         className="p-1 text-gray-600 hover:text-gray-800"
//                                     >
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             className="w-6 h-6"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             stroke="currentColor"
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth={2}
//                                                 d="M6 18L18 6M6 6l12 12"
//                                             />
//                                         </svg>
//                                     </button>
//                                 </div>
//                                 <form onSubmit={handleFormSubmit}>
//                                     <div className="mb-2">
//                                         <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name *</label>
//                                         <input
//                                             type="text"
//                                             name="name"
//                                             placeholder="Name"
//                                             value={formData.name}
//                                             onChange={handleFormChange}
//                                             required
//                                             className="w-full p-2 mt-1 border rounded"
//                                         />
//                                         {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
//                                     </div>
//                                     <div className="mb-2">
//                                         <label htmlFor="city" className="block text-sm font-medium text-gray-700">City *</label>
//                                         <input
//                                             type="text"
//                                             name="city"
//                                             placeholder="City"
//                                             value={formData.city}
//                                             onChange={handleFormChange}
//                                             required
//                                             className="w-full p-2 mt-1 border rounded"
//                                         />
//                                         {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
//                                     </div>
//                                     <div className="mb-2">
//                                         <label htmlFor="mobile_no" className="block text-sm font-medium text-gray-700">Mobile Number *</label>
//                                         <input
//                                             type="text"
//                                             name="mobile_no"
//                                             placeholder="Mobile Number"
//                                             value={formData.mobile_no}
//                                             onChange={handleFormChange}
//                                             required
//                                             className="w-full p-2 mt-1 border rounded"
//                                         />
//                                         {errors.mobile_no && <p className="text-sm text-red-500">{errors.mobile_no}</p>}
//                                     </div>
//                                     <div className="mb-2">
//                                         <label htmlFor="time_slot" className="block text-sm font-medium text-gray-700">Preferred Time Slot *</label>
//                                         <input
//                                             type="text"
//                                             name="time_slot"
//                                             placeholder="Preferred Time Slot"
//                                             value={formData.time_slot}
//                                             onChange={handleFormChange}
//                                             required
//                                             className="w-full p-2 mt-1 border rounded"
//                                         />
//                                         {errors.time_slot && <p className="text-sm text-red-500">{errors.time_slot}</p>}
//                                     </div>
//                                     <div className="mb-2">
//                                         <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">Purpose of Contact *</label>
//                                         <select
//                                             name="purpose"
//                                             value={formData.purpose}
//                                             onChange={handleFormChange}
//                                             required
//                                             className="w-full p-2 mt-1 border rounded"
//                                         >
//                                             <option value="">Select Purpose</option>
//                                             <option value="General Inquiry">General Inquiry</option>
//                                             <option value="Property Posting">Property Posting</option>
//                                             <option value="Property Finding">Property Finding</option>
//                                             <option value="Other">Other</option>
//                                         </select>
//                                         {errors.purpose && <p className="text-sm text-red-500">{errors.purpose}</p>}
//                                     </div>
//                                     <button
//                                         type="submit"
//                                         disabled={isFormSubmitting}
//                                         className="w-full p-2 text-white bg-[#3b83f6] rounded hover:bg-blue-600 disabled:bg-gray-400"
//                                     >
//                                         {isFormSubmitting ? "Submitting..." : "Submit"}
//                                     </button>
//                                 </form>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Input and Send Button */}
//                 <div className="flex mt-4">
//                     <input
//                         type="text"
//                         className="flex-1 p-3 border rounded-l-lg focus:outline-none focus:ring focus:border-blue-400"
//                         placeholder="Type your message..."
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                         disabled={isTyping || showForm} // Disable input when bot is typing or form is open
//                     />
//                     <button
//                         className={`p-3 text-white rounded-r-lg ${
//                             isTyping || showForm ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
//                         } transition-colors duration-200`}
//                         disabled={isTyping || showForm}
//                         onClick={() => {
//                             if (input.trim() !== "") {
//                                 sendMessage(input.trim());
//                                 setInput("");
//                             }
//                         }}
//                     >
//                         {/* New Send Icon SVG */}
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="w-6 h-6"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                         >
//                             <line x1="22" y1="2" x2="11" y2="13" />
//                             <polygon points="22 2 15 22 11 13 2 9 22 2" />
//                         </svg>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const ChatbotModal = ({ isOpen, onClose }) => {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg">
                
//                 {/* Close Button */}
//                 <button
//                     onClick={onClose}
//                     className="absolute p-2 text-gray-600 top-4 right-4 hover:text-gray-800"
//                 >
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="w-6 h-6"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M6 18L18 6M6 6l12 12"
//                         />
//                     </svg>
//                 </button>

//                 {/* Chatbot Component */}
//                 <Chatbot />
//             </div>
//         </div>
//     );
// };

// export default ChatbotModal;

