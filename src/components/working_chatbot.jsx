
// const addfaq =
//   {
//       faqs: [
//         {
//           "question": "How do I reset my password?",
//           "answer": "You can reset your password by clicking on the 'Forgot Password' link on the login page and following the instructions."
//         },
//         {
//           "question": "How can I update my profile information?",
//           "answer": "You can update your profile information by navigating to the 'Profile' section in your account settings."
//         },
//         {
//           "question": "What payment methods do you accept?",
//           "answer": "We accept credit/debit cards, PayPal, and bank transfers."
//         },
//         {
//           "question": "How do I contact customer support?",
//           "answer": "You can contact customer support by emailing support@rufrent.com or using the live chat feature on our website."
//         },
//         {
//           "question": "What is your refund policy?",
//           "answer": "We offer a 30-day money-back guarantee. If you're not satisfied, you can request a refund within 30 days of purchase."
//         },
//         {
//           "question": "How do I cancel my subscription?",
//           "answer": "You can cancel your subscription by going to the 'Billing' section in your account settings and selecting 'Cancel Subscription.'"
//         },
//         {
//           "question": "Where can I download my invoice?",
//           "answer": "You can download your invoice from the 'Invoices' section in your account dashboard."
//         },
//         {
//           "question": "How do I report a bug or issue?",
//           "answer": "You can report a bug or issue by emailing support@rufrent.com or using the 'Report a Bug' feature in the app."
//         },
//         {
//           "question": "What are your business hours?",
//           "answer": "Our customer support team is available Monday to Friday, 9 AM to 6 PM (GMT)."
//         },
//         {
//           "question": "How do I change my email address?",
//           "answer": "You can change your email address in the 'Account Settings' section of your profile."
//         },
//         {
//           "question": "Can I upgrade or downgrade my plan?",
//           "answer": "Yes, you can upgrade or downgrade your plan at any time from the 'Billing' section in your account settings."
//         },
//         {
//           "question": "How do I delete my account?",
//           "answer": "You can delete your account by going to the 'Account Settings' section and selecting 'Delete Account.'"
//         },
//         {
//           "question": "What should I do if I forgot my username?",
//           "answer": "If you forgot your username, click on the 'Forgot Username' link on the login page and follow the instructions."
//         },
//         {
//           "question": "How do I enable two-factor authentication?",
//           "answer": "You can enable two-factor authentication in the 'Security' section of your account settings."
//         },
//         {
//           "question": "How do I update my billing information?",
//           "answer": "You can update your billing information in the 'Billing' section of your account settings."
//         }
//       ]
//     };
  


// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import tailwindStyles from "./tailwindStyles2";

// const messageMap = {
//     "start": {
//         message: "👋 Welcome to RufRent - your one-stop solution for hassle-free renting and posting! Need help? Don't hesitate!",
//         options: [
//             { key: "1", text: "Property Posting Details 🏡" },
//             { key: "2", text: "Property Search Details 🔍" },
//             { key: "3", text: "Connecting With Us" },
//             { key: "4", text: "Favourite Property Listings" },
//             { key: "0", text: "Request a CallBack" },
//             { key: "9", text: "Main Menu" }
            
//         ]
//     },
//     "1": {
//         message: "📌 Details for Posting a Property",
//         steps: [
//             "1️⃣ Click on this link: https://www.rufrent.com/user/postProperties",
//             "2️⃣ Complete Signup/Login Process",
//             "3️⃣ Click on [Post Property Free] Button",
//             "4️⃣ Fill All Required Details and Click On Submit Button",
//             "5️⃣ Property Posting is Successful, Will be Visible After Approvals"
//         ],
//         options: [{ key: "9", text: "Back to Main Menu" }]
//     },
//     "2": {
//         message: "🔍 Details for Searching Property:",
//         steps: [
//             "1️⃣ Visit Link: https://www.rufrent.com/user",
//             "2️⃣ Apply required filters to get curated properties",
//             "3️⃣ Click on Connect to Relationship Manager Button for Further Assistance."
//         ],
//         options: [{ key: "9", text: "Back to Main Menu" }]
//     },
//     "3": {
//         message: "Contact Us: https://www.rufrent.com/footer/contact-us ",
//         options: [{ key: "9", text: "Back to Main Menu" }]
//     },
//     "4": {
//         message: "📌 Favorites Details",
//         steps: [
//             "1️⃣ Click on the Link: https://www.rufrent.com/user/myfavorites",
//             "2️⃣ Find Favourite Properties"
//         ],
//         options: [{ key: "9", text: "Back to Main Menu" }]
//     },
//     "9": {
//         message: "Main Menu",
//         options: [
//             { key: "1", text: "Property Posting Details 🏡" },
//             { key: "2", text: "Property Search Details 🔍" },
//             { key: "3", text: "Connecting With Us" },
//             { key: "4", text: "Favourite Property Listings" },
//             { key: "0", text: "Request a CallBack" }
//         ]
//     },
//     "0": {
//         message: "Please fill out the form below for a CallBack from Relationship Manager"
//     }
// };

// const Chatbot = ({ onClose }) => {
//     const [messages, setMessages] = useState([]);
//     const [isTyping, setIsTyping] = useState(false);
//     const [showForm, setShowForm] = useState(false);
//     const [formData, setFormData] = useState({
//         name: "",
//         city: "",
//         mobile_no: "",
//         time_slot: "",
//         purpose: ""
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

//     // const sendMessage = (key) => {
//     //     if (!messageMap[key]) {
//     //         setMessages((prev) => [
//     //             ...prev,
//     //             { type: "user", text: key },
//     //             { type: "bot", text: "Oops! I am still learning. Please select a valid option." },
//     //             ...messageMap["start"].options.map((opt) => ({ type: "bot", text: `${opt.key}. ${opt.text}` }))
//     //         ]);
//     //         return;
//     //     }
    
//     //     // Find the corresponding text for the key
//     //     const userMessageText = messageMap["start"]?.options?.find(opt => opt.key === key)?.text || key;
    
//     //     setMessages((prev) => [...prev, { type: "user", text: userMessageText }]);
//     //     setIsTyping(true);
    
//     //     setTimeout(() => {
//     //         const botResponse = messageMap[key];
//     //         const botMessages = [
//     //             { type: "bot", text: botResponse.message },
//     //             ...(botResponse.steps || []).map((step) => ({ type: "bot", text: step })),
//     //             ...(botResponse.options || []).map((opt) => ({ type: "bot", text: `${opt.key}. ${opt.text}`, clickable: true }))
//     //         ];
//     //         setMessages((prev) => [...prev, ...botMessages]);
//     //         setIsTyping(false);
//     //         if (key === "0") {
//     //             setShowForm(true);
//     //         }
//     //     }, 1000); // Simulate typing delay
//     // };


//     const sendMessage = (key) => {
//         if (!messageMap[key]) {
//             setMessages((prev) => [
//                 ...prev,
//                 { type: "user", text: key },
//                 { type: "bot", text: "Oops! I am still learning. Please select a valid option." },
//                 ...messageMap["start"].options.map((opt) => ({ type: "bot", text: opt.text, key: opt.key, clickable: true }))
//             ]);
//             return;
//         }
    
//         // Find the corresponding text for the key
//         const userMessageText = messageMap["start"]?.options?.find(opt => opt.key === key)?.text || key;
    
//         setMessages((prev) => [...prev, { type: "user", text: userMessageText }]);
//         setIsTyping(true);
    
//         setTimeout(() => {
//             const botResponse = messageMap[key];
//             const botMessages = [
//                 { type: "bot", text: botResponse.message },
//                 ...(botResponse.steps || []).map((step) => ({ type: "bot", text: step })),
//                 ...(botResponse.options || []).map((opt) => ({ type: "bot", text: opt.text, key: opt.key, clickable: true }))
//             ];
//             setMessages((prev) => [...prev, ...botMessages]);
//             setIsTyping(false);
//             if (key === "0") {
//                 setShowForm(true);
//             }
//         }, 1000); // Simulate typing delay
//     };

//     const handleFormChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//         setErrors({
//             ...errors,
//             [name]: ""
//         });
//     };
//     const validateForm = () => {
//         const newErrors = {};
        
//         // Name validation
//         if (!formData.name.trim()) {
//             newErrors.name = "Name is required";
//         } else if (formData.name.trim().length > 50) {
//             newErrors.name = "Name cannot exceed 50 characters";
//         }
    
//         // City validation
//         if (!formData.city.trim()) {
//             newErrors.city = "City is required";
//         } else if (formData.city.trim().length > 30) {
//             newErrors.city = "City cannot exceed 30 characters";
//         }
    
//         // Mobile number validation (exactly 10 digits)
//         if (!formData.mobile_no.trim()) {
//             newErrors.mobile_no = "Mobile number is required";
//         } else if (!/^\d{10}$/.test(formData.mobile_no)) {
//             newErrors.mobile_no = "Mobile number must be exactly 10 digits";
//         }
    
//         // Time slot validation
//         if (!formData.time_slot.trim()) {
//             newErrors.time_slot = "Preferred time slot is required";
//         } else if (formData.time_slot.trim().length > 30) {
//             newErrors.time_slot = "Time slot cannot exceed 30 characters";
//         }
    
//         // Purpose validation
//         if (!formData.purpose.trim()) {
//             newErrors.purpose = "Purpose of contact is required";
//         }
    
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };
    
//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;

//         setIsFormSubmitting(true);
//         try {
//             const response = await axios.post("http://localhost:5000/api/addChatbotEntry", formData);
//             if (response.status === 201) {
//                 setMessages((prev) => [
//                     ...prev,
//                     { type: "bot", text: "Thank you! We will contact you shortly." },
//                     {type: "bot", text: "9. Back to Main Menu", clickable: true}
//                 ]);
//                 setShowForm(false);
//                 alert("Thank you!, we will contact you soon");
//             } else {
//                 setMessages((prev) => [
//                     ...prev,
//                     { type: "bot", text: "Failed to submit your details. Please try again later." },
//                     {type: "bot", text: "9. Back to Main Menu", clickable: true}
//                 ]);
//                 alert("Failed to submit your details. Please try again later");
//             }
//         } catch (error) {
//             console.error("Error submitting form:", error);
//             setMessages((prev) => [
//                 ...prev,
//                 { type: "bot", text: error?.response?.data?.message || "An error occurred. Please try again later." },
//                 {type: "bot", text: "9. Back to Main Menu", clickable: true}
//             ]);
//             alert(error?.response?.data?.message || "An error occurred. Please try again later.");
//         } finally {
//             setIsFormSubmitting(false);
//         }
//     };

//     const handleCloseForm = () => {
//         setShowForm(false);
//     };

//     // const handleBotMessageClick = (text) => {
//     //     const optionKey = text.split(". ")[0];
//     //     console.log("DONE", text.split(". ")[1])
//     //     if (optionKey && messageMap[optionKey]) {
//     //         sendMessage(optionKey, text.split(". ")[1]);
//     //     }
//     // };
//     const handleBotMessageClick = (key) => {
//         if (messageMap[key]) {
//             sendMessage(key);
//         }
//     };
//     return (
//         <div className={`flex flex-col h-full ${tailwindStyles.paragraph_b}`}>
//             {/* Chatbot Header with Close Button */}
//             <div className="flex items-center justify-between p-4 bg-[#001433] text-white">
//                 <h2 className="text-xl font-bold">💬 Rufi : Chatbot</h2>
//                 <button
//                     onClick={onClose}
//                     className="p-2 text-gray-300 hover:text-white"
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
//             </div>

//             {/* Chat Messages Container */}
//             <div
//                 ref={chatRef}
//                 className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50"
//                 style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//             >
//                 {/* {messages.map((msg, index) => (
//                     <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
//                         <div
//                             className={`p-3 max-w-xs rounded-lg shadow-md text-sm ${
//                                 msg.type === "user"
//                                     ? "bg-blue-500 text-white rounded-br-none"
//                                     : msg.clickable
//                                     ? "bg-green-100 text-gray-800 rounded-bl-none cursor-pointer hover:bg-green-200"
//                                     : "bg-gray-200 text-gray-800 rounded-bl-none"
//                             }`}
//                             onClick={() => msg.clickable && handleBotMessageClick(msg.text)}
//                         >
//                             {formatMessage(msg.text)}
//                         </div>
//                     </div>
//                 ))} */}
//                 {messages.map((msg, index) => (
//     <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
//         <div
//             className={`p-3 max-w-xs rounded-lg shadow-md text-sm ${
//                 msg.type === "user"
//                     ? "bg-blue-500 text-white rounded-br-none"
//                     : msg.clickable
//                     ? "bg-green-100 text-gray-800 rounded-bl-none cursor-pointer hover:bg-green-200"
//                     : "bg-gray-200 text-gray-800 rounded-bl-none"
//             }`}
//             onClick={() => msg.clickable && handleBotMessageClick(msg.key)}
//         >
//             {formatMessage(msg.text)}
//         </div>
//     </div>
// ))}
//                 {isTyping && (
//                     <div className="flex justify-start">
//                         <div className="max-w-xs p-3 text-sm text-gray-800 bg-gray-200 rounded-lg rounded-bl-none shadow-md">
//                             ⌛ Typing...
//                         </div>
//                     </div>
//                 )}

//                 {showForm && (
//                     <div className="flex justify-start">
//                         <div className="w-full max-w-md p-3 text-gray-800 bg-gray-200 rounded-lg rounded-bl-none shadow-md text-md">
//                             <div className="flex items-center justify-between mb-4">
//                                 <h3 className="text-lg font-semibold">Request a Callback</h3>
//                                 <button
//                                     onClick={handleCloseForm}
//                                     className="p-1 text-gray-600 hover:text-gray-800"
//                                 >
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className="w-6 h-6"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                     >
//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             strokeWidth={2}
//                                             d="M6 18L18 6M6 6l12 12"
//                                         />
//                                     </svg>
//                                 </button>
//                             </div>
//                             <form onSubmit={handleFormSubmit}>
//                                 <div className="mb-2">
//                                     <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name *</label>
//                                     <input
//                                         type="text"
//                                         name="name"
//                                         placeholder="Name"
//                                         value={formData.name}
//                                         onChange={handleFormChange}
//                                         required
//                                         className="w-full p-2 mt-1 border rounded"
//                                     />
//                                     {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
//                                 </div>
//                                 <div className="mb-2">
//                                     <label htmlFor="city" className="block text-sm font-medium text-gray-700">City *</label>
//                                     <input
//                                         type="text"
//                                         name="city"
//                                         placeholder="City"
//                                         value={formData.city}
//                                         onChange={handleFormChange}
//                                         required
//                                         className="w-full p-2 mt-1 border rounded"
//                                     />
//                                     {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
//                                 </div>
//                                 <div className="mb-2">
//                                     <label htmlFor="mobile_no" className="block text-sm font-medium text-gray-700">Mobile Number *</label>
//                                     <input
//                                         type="tel"
//                                         name="mobile_no"
//                                         placeholder="1234567890"
//                                         value={formData.mobile_no}
//                                         onChange={handleFormChange}
//                                         required
//                                         className="w-full p-2 mt-1 border rounded"
//                                     />
//                                     {errors.mobile_no && <p className="text-sm text-red-500">{errors.mobile_no}</p>}
//                                 </div>
//                                 <div className="mb-2">
//                                     <label htmlFor="time_slot" className="block text-sm font-medium text-gray-700">Preferred Time Slot *</label>
//                                     <input
//                                         type="text"
//                                         name="time_slot"
//                                         placeholder="Preferred Time Slot"
//                                         value={formData.time_slot}
//                                         onChange={handleFormChange}
//                                         required
//                                         className="w-full p-2 mt-1 border rounded"
//                                     />
//                                     {errors.time_slot && <p className="text-sm text-red-500">{errors.time_slot}</p>}
//                                 </div>
//                                 <div className="mb-2">
//                                     <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">Purpose of Contact *</label>
//                                     <select
//                                         name="purpose"
//                                         value={formData.purpose}
//                                         onChange={handleFormChange}
//                                         required
//                                         className="w-full p-2 mt-1 border rounded"
//                                     >
//                                         <option value="" disabled>Select Purpose</option>
//                                         <option value="General Inquiry">General Inquiry</option>
//                                         <option value="Property Posting">Property Posting</option>
//                                         <option value="Property Finding">Property Finding</option>
//                                         <option value="Other">Other</option>
//                                     </select>
//                                     {errors.purpose && <p className="text-sm text-red-500">{errors.purpose}</p>}
//                                 </div>
//                                 <button
//                                     type="submit"
//                                     disabled={isFormSubmitting}
//                                     className={`w-full ${tailwindStyles.secondaryButton}`}
//                                 >
//                                     {isFormSubmitting ? "Submitting..." : "Submit"}
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// const ChatbotModal = ({ isOpen, onClose }) => {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-end justify-end p-4 bg-black bg-opacity-50">
//             <div className="w-full max-w-md h-[80vh] bg-white rounded-t-lg shadow-lg flex flex-col">
//                 <Chatbot onClose={onClose} />
//             </div>
//         </div>
//     );
    
// };



// export default ChatbotModal;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import tailwindStyles from "./tailwindStyles2";

// Hardcoded FAQs
const faqs = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page and following the instructions.",
  },
  {
    question: "How can I update my profile information?",
    answer: "You can update your profile information by navigating to the 'Profile' section in your account settings.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards, PayPal, and bank transfers.",
  },
  // Add more FAQs as needed
];

const messageMap = {
  start: {
    message: "👋 Welcome to RufRent - your one-stop solution for hassle-free renting and posting! Need help? Don't hesitate!",
    options: [
      { key: "faq", text: "FAQs" },
      { key: "1", text: "Property Posting Details 🏡" },
      { key: "2", text: "Property Search Details 🔍" },
      { key: "3", text: "Connecting With Us" },
      { key: "4", text: "Favourite Property Listings" },
      { key: "0", text: "Request a CallBack" },
      // Add FAQ option
    ],
  },
  // Other messageMap entries...
};

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false); // State to control FAQ visibility
  const chatRef = useRef(null);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      sendMessage("start");
    }
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const formatMessage = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) =>
      urlRegex.test(part) ? (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  const sendMessage = (key) => {
    if (key === "faq") {
      // Handle FAQ button click
      setShowFAQ(true);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Here are some frequently asked questions:" },
        ...faqs.map((faq, index) => ({
          type: "bot",
          text: `${index + 1}. ${faq.question}`,
          key: `faq-${index}`,
          clickable: true,
        })),
      ]);
      return;
    }

    if (!messageMap[key]) {
      setMessages((prev) => [
        ...prev,
        { type: "user", text: key },
        { type: "bot", text: "Oops! I am still learning. Please select a valid option." },
        ...messageMap["start"].options.map((opt) => ({
          type: "bot",
          text: opt.text,
          key: opt.key,
          clickable: true,
        })),
      ]);
      return;
    }

    // Find the corresponding text for the key
    const userMessageText = messageMap["start"]?.options?.find((opt) => opt.key === key)?.text || key;

    setMessages((prev) => [...prev, { type: "user", text: userMessageText }]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = messageMap[key];
      const botMessages = [
        { type: "bot", text: botResponse.message },
        ...(botResponse.steps || []).map((step) => ({ type: "bot", text: step })),
        ...(botResponse.options || []).map((opt) => ({
          type: "bot",
          text: opt.text,
          key: opt.key,
          clickable: true,
        })),
      ];
      setMessages((prev) => [...prev, ...botMessages]);
      setIsTyping(false);
      if (key === "0") {
        setShowForm(true);
      }
    }, 1000); // Simulate typing delay
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    // Validation logic...
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsFormSubmitting(true);
    try {
      const response = await axios.post("http://localhost:5000/api/addChatbotEntry", formData);
      if (response.status === 201) {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "Thank you! We will contact you shortly." },
          { type: "bot", text: "Back to Main Menu", key: "9", clickable: true },
        ]);
        setShowForm(false);
        alert("Thank you!, we will contact you soon");
      } else {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "Failed to submit your details. Please try again later." },
          { type: "bot", text: "Back to Main Menu", key: "9", clickable: true },
        ]);
        alert("Failed to submit your details. Please try again later");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: error?.response?.data?.message || "An error occurred. Please try again later." },
        { type: "bot", text: "Back to Main Menu", key: "9", clickable: true },
      ]);
      alert(error?.response?.data?.message || "An error occurred. Please try again later.");
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleBotMessageClick = (key) => {
    if (key.startsWith("faq")) {
      // Handle FAQ question click
      const index = parseInt(key.split("-")[1], 10);
      const selectedFAQ = faqs[index];
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: `Q: ${selectedFAQ.question}` },
        { type: "bot", text: `A: ${selectedFAQ.answer}` },
      ]);
    } else if (messageMap[key]) {
      sendMessage(key);
    }
  };

  return (
    <div className={`flex flex-col h-full ${tailwindStyles.paragraph_b}`}>
      {/* Chatbot Header with Close Button */}
      <div className="flex items-center justify-between p-4 bg-[#001433] text-white">
        <h2 className="text-xl font-bold">💬 Rufi : Chatbot</h2>
        <button onClick={onClose} className="p-2 text-gray-300 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Chat Messages Container */}
      <div
        ref={chatRef}
        className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`p-3 max-w-xs rounded-lg shadow-md text-sm ${
                msg.type === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : msg.clickable
                  ? "bg-green-100 text-gray-800 rounded-bl-none cursor-pointer hover:bg-green-200"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
              onClick={() => msg.clickable && handleBotMessageClick(msg.key)}
            >
              {formatMessage(msg.text)}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-xs p-3 text-sm text-gray-800 bg-gray-200 rounded-lg rounded-bl-none shadow-md">
              ⌛ Typing...
            </div>
          </div>
        )}

        {showForm && (
          <div className="flex justify-start">
            <div className="w-full max-w-md p-3 text-gray-800 bg-gray-200 rounded-lg rounded-bl-none shadow-md text-md">
              {/* Form content... */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ChatbotModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-md h-[80vh] bg-white rounded-t-lg shadow-lg flex flex-col">
        <Chatbot onClose={onClose} />
      </div>
    </div>
  );
};

export default ChatbotModal;