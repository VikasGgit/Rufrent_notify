// import React, { useState, useEffect } from "react";

// const Payment = () => {
//   const [amount, setAmount] = useState(1); // Default amount
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     script.onload = () => console.log("Razorpay script loaded!");
//     document.body.appendChild(script);
//   }, []);


//   const handlePayment = async () => {
//     try {
//       // 1️⃣ Create Order on Backend
//       const orderResponse = await fetch("http://localhost:5000/api/payments/create-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ T_amount:amount, currency:"INR", Inv_Id:"vikas1"}),
//       });

//       const orderData = await orderResponse.json();
//       console.log(orderData)
//       if (!orderData.success) {
//         alert("Failed to create order");
//         return;
//       }
//     console.log("orderData", orderData);

//       // 2️⃣ Initialize Razorpay Payment
//       const options = {
//         key: "rzp_test_v521ErjMrzxocB",
//         amount: orderData.order.amount,
//         currency: orderData.order.currency,
//         name: "Vikas Gupta",
//         description: "Testing the payment method",
//         order_id: orderData.order.id,
//         handler: async function (response) {
//           // 3️⃣ Verify Payment on Backend
//           const verifyResponse = await fetch("http://localhost:5000/api/payments/verify-payment", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_order_id: orderData.order.id, // Ensure order ID matches
//               Inv_Id:"vikas1"
//             }),
//           });
//           console.log(response)
//           const verifyData = await verifyResponse.json();
//           if (verifyData.success) {
//             alert("Payment verified successfully!");
//           } else {
//             alert("Payment verification failed: " + verifyData.message);
//           }
//         },
//         prefill: { name: "Testing", email: "Testing@qtiminds.com", contact: 8174877531 },
//         theme: { color: "red" },
//       };
// console.log("options: ", options);
//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.log("Payment error:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Make a Payment</h2>
//       <button onClick={handlePayment}>Pay ₹{amount}</button>
//     </div>
//   );
// };

// export default Payment;


import React, { useState, useEffect } from "react";

const Payment = () => {
  
  const [isLoading, setIsLoading] = useState(false);

  // Load Razorpay Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log("Razorpay script loaded!");
    document.body.appendChild(script);
  }, []);

  // Handle Payment
  const handlePayment = async () => {
    setIsLoading(true);
    try {
      // 1️⃣ Create Order on Backend
      const orderResponse = await fetch("http://localhost:5000/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Inv_Id: "RRI-202503-1" }),
      });

      const orderData = await orderResponse.json();
      if (!orderData.success) {
        alert(orderData.error);
        setIsLoading(false);
        return;
      }
      console.log("orderData", orderData);

      // 2️⃣ Initialize Razorpay Payment
      const options = {
        key: "rzp_test_v521ErjMrzxocB", // Replace with your Razorpay Key
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Vikas Gupta",
        description: "Testing the payment method",
        order_id: orderData.order.id,
        handler: async function (response) {
          // 3️⃣ Verify Payment on Backend
          const verifyResponse = await fetch("http://localhost:5000/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: orderData.order.id, 
              Inv_Id: 'RRI-202503-1',
              user_id:"gO0xHn484uc89xqizgg3ODNCN3v2",
              prop_id:11
            }),
          });
          const verifyData = await verifyResponse.json();
          if (verifyData.success) {
            alert("Payment verified successfully!");
          } else {
            alert("Payment verification failed: " + verifyData.message);
          }
        },
        prefill: { name: "Vikas Gupta", email: "vikas@example.com", contact: "8174877531" },
        theme: { color: "blue" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setIsLoading(false);
    } catch (error) {
      console.log("Payment error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Make a Payment</h2>
      
      <button onClick={handlePayment} disabled={isLoading}>
        {isLoading ? "Processing..." : `Pay`}
      </button>
    </div>
  );
};

export default Payment;
