import React , {useState} from "react";
import LoginSignup from "./components/LoginSignup"
import ChatbotModal from "./components/ChatBot2";
import Payment from "./components/Payment"

const App = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
<LoginSignup/>
<Payment/>
      
      <header className="p-4 bg-[#001433] text-white">
        <h1 className="text-2xl font-bold">Welcome to RufRent</h1>
      </header>


      {/* Chatbot Button */}
      <button
        onClick={() => setIsChatbotOpen(true)}
        className="fixed p-4 text-white transition-colors duration-200 bg-blue-500 rounded-full shadow-lg bottom-10 right-10 hover:bg-blue-600"
      >
        💬 Chat
      </button>

      {/* Chatbot Modal */}
      <ChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />
    </div>
  );
};

export default App;