import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import tailwindStyles from "./tailwindStyles2";

const messageMap = {
    "start": [
        "👋 Welcome to RufRent - your one-stop solution for hassle-free renting and posting! Need help? Don't hesitate!",
        "1 : Property Posting Details 🏡",
        "2 : Property Search Details 🔍",
        "3 : Connecting With Us 📞",
        "4 : Favourite Property Listings",
        "0 : Request a CallBack"
    ],
    "1": [
        "📌 Details for Posting a Property",
        "1️⃣ Click on this link : https://www.rufrent.com/user/postProperties",
        "2️⃣ Complete Signup/Login Process",
        "3️⃣ Click on [Post Property Free] Button",
        "4️⃣ Fill All Required Details and Click On Submit Button",
        "5️⃣ Property Posting is Successful, Will be Visible After Approvals",
        "Enter: 9 for Main Menu",
    ],
    "2": [
        "🔍  Details for Searching Property:",
        "1️⃣ Visit Link: https://www.rufrent.com/user",
        "2️⃣ Apply required filters to get curated properties",
        "3️⃣ Click on Connect to Relationship Manager Button for Further Assistance.",
        "Enter: 9 for Main Menu",
    ],
    "3": [

        "Contact Us: https://www.rufrent.com/contact_us 📞",
        "Enter: 9 for Main Menu",
    ],
    "4": [
        "📌 Favorites Details",
        "1️⃣ Click on the Link https://www.rufrent.com/user/myconnection",
        "2️⃣ Find Favourite Properties",
        "Enter: 9 for Main Menu",
    ],
    "9": [
        "1 : Property Posting Details 🏡",
        "2 : Property Search Details 🔍",
        "3 : Connecting With Us 📞",
        "4 : Favourite Property Listings",
        "0 : Request a CallBack"
    ],
    "0": [
        "Please fill out the form below for a CallBack from Relationship Manager"
    ],
};


const Chatbot = ({ onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        city: "",
        mobile_no: "",
        time_slot: "",
        purpose: "" 
    });
    const [errors, setErrors] = useState({});
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
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
        if (!messageMap[key]) {
            setMessages((prev) => [
                ...prev,
                { type: "user", text: key },
                {type: "bot", text: "Oops! I am still learning. Please Enter the Valid Input"},
                {type: "bot", text: "1 : Property Posting Details 🏡"},
                {type: "bot", text: "2 : Property Search Details 🔍"},
                {type: "bot", text: "3 : Connecting With Us 📞"},
                {type: "bot", text: "4 : Favourite Property Listings"},
                {type: "bot", text: "0 : Request a CallBack"}
            ]);
            return;
        }

        setMessages((prev) => [...prev, { type: "user", text: key }]);
        setIsTyping(true);

        setTimeout(() => {
            const botMessages = messageMap[key].map((line) => ({ type: "bot", text: line }));
            setMessages((prev) => [...prev, ...botMessages]);
            setIsTyping(false);
            if (key === "0") {
                setShowForm(true);
            }
        }, 1000); // Simulate typing delay
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && input.trim() !== "" && !isTyping && !showForm) {
            sendMessage(input.trim());
            setInput("");
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear the error message when the user starts typing again
        setErrors({
            ...errors,
            [name]: ""
        });
    };

    const validateForm = () => {
        const newErrors = {};
        
        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.trim().length > 50) {
            newErrors.name = "Name cannot exceed 50 characters";
        }
    
        // City validation
        if (!formData.city.trim()) {
            newErrors.city = "City is required";
        } else if (formData.city.trim().length > 30) {
            newErrors.city = "City cannot exceed 30 characters";
        }
    
        // Mobile number validation (exactly 10 digits)
        if (!formData.mobile_no.trim()) {
            newErrors.mobile_no = "Mobile number is required";
        } else if (!/^\d{10}$/.test(formData.mobile_no)) {
            newErrors.mobile_no = "Mobile number must be exactly 10 digits";
        }
    
        // Time slot validation
        if (!formData.time_slot.trim()) {
            newErrors.time_slot = "Preferred time slot is required";
        } else if (formData.time_slot.trim().length > 30) {
            newErrors.time_slot = "Time slot cannot exceed 30 characters";
        }
    
        // Purpose validation
        if (!formData.purpose.trim()) {
            newErrors.purpose = "Purpose of contact is required";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsFormSubmitting(true);
        try {
            const response = await axios.post("http://localhost:5000/api/addChatbotEntry", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("response: ", response);
            if (response.status === 201) {
                setMessages((prev) => [
                    ...prev,
                    { type: "bot", text: "Thank you! We will contact you shortly." }
                ]);
                setShowForm(false);
                alert("Thank you!, we will contact you soon")
            } 
            else {
                setMessages((prev) => [
                    ...prev,
                    { type: "bot", text: "Failed to submit your details. Please try again later." }
                ])
                alert("Failed to submit your details. Please try again later");
                // Keep the form open if the submission fails
                setShowForm(true);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setMessages((prev) => [
                ...prev,
                { type: "bot", text: error?.response?.data?.message|| "An error occurred. Please try again later." }
            ]);
            alert(error?.response?.data?.message|| "An error occurred. Please try again later.");
            // Keep the form open if an error occurs
            setShowForm(true);
        } finally {
            setIsFormSubmitting(false);
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    return (
        <div className={`flex flex-col h-full  ${tailwindStyles.paragraph_b} `}>
            {/* Chatbot Header with Close Button */}
            <div className="flex items-center justify-between p-4 bg-[#001433] text-white">
                <h2 className="text-xl font-bold">💬 Rufi : Chatbot</h2>
                <button
                    onClick={onClose}
                    className="p-2 text-gray-300 hover:text-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            {/* Chat Messages Container */}
            <div
                ref={chatRef}
                className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar
            >
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                            className={`p-3 max-w-xs rounded-lg shadow-md text-sm ${
                                msg.type === "user"
                                    ? "bg-blue-500 text-white rounded-br-none"
                                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                            }`}
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
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Request a Callback</h3>
                <button
                    onClick={handleCloseForm}
                    className="p-1 text-gray-600 hover:text-gray-800"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name *</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        className="w-full p-2 mt-1 border rounded"
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>
                <div className="mb-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City *</label>
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleFormChange}
                        required
                        className="w-full p-2 mt-1 border rounded"
                    />
                    {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                </div>
                <div className="mb-2">
                    <label htmlFor="mobile_no" className="block text-sm font-medium text-gray-700">Mobile Number *</label>
                    <input
                        type="tel"
                        name="mobile_no"
                        placeholder="1234567890"
                        value={formData.mobile_no}
                        onChange={handleFormChange}
                        required
                    
                        className="w-full p-2 mt-1 border rounded"
                    />
                    {errors.mobile_no && (
                        <p className="text-sm text-red-500">
                            {errors.mobile_no}
                        </p>
                    )}
                </div>
                <div className="mb-2">
                    <label htmlFor="time_slot" className="block text-sm font-medium text-gray-700">Preferred Time Slot *</label>
                    <input
                        type="text"
                        name="time_slot"
                        placeholder="Preferred Time Slot"
                        value={formData.time_slot}
                        onChange={handleFormChange}
                        required
                        className="w-full p-2 mt-1 border rounded"
                    />
                    {errors.time_slot && <p className="text-sm text-red-500">{errors.time_slot}</p>}
                </div>
                <div className="mb-2">
                    <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">Purpose of Contact *</label>
                    <select
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleFormChange}
                        required
                        className="w-full p-2 mt-1 border rounded"
                    >
                        <option value=""disabled >Select Purpose</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Property Posting">Property Posting</option>
                        <option value="Property Finding">Property Finding</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.purpose && <p className="text-sm text-red-500">{errors.purpose}</p>}
                </div>
                <button
                    type="submit"
                    disabled={isFormSubmitting}
                    className={`w-full ${tailwindStyles.secondaryButton}`}
                >
                    {isFormSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    </div>
)}
            </div>

            {/* Input and Send Button */}
            <div className="flex p-4 bg-white border-t">
                <input
                    type="text"
                    className="flex-1 p-3 border rounded-l-lg focus:outline-none focus:ring focus:border-blue-400"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isTyping || showForm} // Disable input when bot is typing or form is open
                />
                <button
                    className={`p-3 text-white rounded-r-lg ${
                        isTyping || showForm ? "bg-gray-400" : `${tailwindStyles.secondaryButton} `
                    } transition-colors duration-200`}
                    disabled={isTyping || showForm}
                    onClick={() => {
                        if (input.trim() !== "") {
                            sendMessage(input.trim());
                            setInput("");
                        }
                    }}
                >
                    {/* New Send Icon SVG */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

const ChatbotModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
            {/* Position the chatbot at the bottom-right corner */}
            <div className="fixed bottom-0 right-0 w-full max-w-md h-[100vh] bg-white rounded-t-lg shadow-lg flex flex-col">
                {/* Chatbot Component */}
                <Chatbot onClose={onClose} />
            </div>
        </div>
    );
};
export default ChatbotModal;