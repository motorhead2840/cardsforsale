import { useEffect } from 'react';

export default function PaymentFiat({ amount }) {
  const handlePayment = async () => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "CypherMonk Storage",
      description: "Cold Wallet Steel Card",
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        // Here you would typically call your backend API to verify and record the order
      },
      prefill: {
        email: "customer@example.com",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="payment-box">
      <h3>Pay via UPI/Card (₹{amount})</h3>
      <button onClick={handlePayment} className="pay-btn">
        Buy with INR
      </button>
      {/* Load Razorpay SDK */}
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
  );
}
