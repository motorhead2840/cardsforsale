import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import axios from 'axios';

export default function PaymentCrypto({ priceBtc }) {
  const [status, setStatus] = useState('waiting'); // waiting, detected, confirmed
  const walletAddress = process.env.NEXT_PUBLIC_BTC_ADDRESS;

  // Simple polling to check for new transactions
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // Check address activity using public API (Mempool.space)
        const response = await axios.get(`https://mempool.space/api/address/${walletAddress}/txs`);
        const txs = response.data;
        
        // Check if any recent TX matches our price (simplified logic)
        // In production, you'd generate a unique address per order to track specifically
        if (txs.length > 0) {
           // Logic to verify timestamp and amount would go here
           // For demo, we just assume if we see a TX, it's incoming
           setStatus('detected'); 
        }
      } catch (error) {
        console.error("Error fetching blockchain data", error);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="payment-box crypto">
      <h3>Pay with Bitcoin</h3>
      <div className="qr-container">
        <QRCode value={`bitcoin:${walletAddress}?amount=${priceBtc}`} size={128} />
      </div>
      <p className="address">{walletAddress}</p>
      <p className="price">Send: <strong>{priceBtc} BTC</strong></p>
      
      <div className={`status-indicator ${status}`}>
        {status === 'waiting' && "⏳ Waiting for transaction..."}
        {status === 'detected' && "🚀 Payment Detected! Confirming..."}
      </div>
    </div>
  );
}
