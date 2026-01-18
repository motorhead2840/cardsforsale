import Head from 'next/head';
import PaymentFiat from '../components/PaymentFiat';
import PaymentCrypto from '../components/PaymentCrypto';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>CypherMonk | Cold Storage</title>
      </Head>

      <main>
        <h1>CypherMonk <span className="highlight">Cold Storage</span></h1>
        
        <div className="product-card">
          <h2>Titanium Seed Plate</h2>
          <p>Fireproof, waterproof, tamper-evident private key storage.</p>
          <div className="pricing">
            <span>₹4,999</span> / <span>0.0015 BTC</span>
          </div>

          <div className="payment-options">
            <PaymentFiat amount={4999} />
            <div className="divider">OR</div>
            <PaymentCrypto priceBtc={0.0015} />
          </div>
        </div>
      </main>

      <style jsx>{`
        .container { padding: 2rem; font-family: monospace; background: #111; color: #fff; min-height: 100vh; }
        .product-card { border: 1px solid #333; padding: 2rem; max-width: 600px; margin: 2rem auto; border-radius: 8px; }
        .highlight { color: #f2a900; } /* Bitcoin Orange */
        .payment-options { display: flex; gap: 2rem; margin-top: 2rem; flex-wrap: wrap;}
        .divider { display: flex; align-items: center; color: #555; }
      `}</style>
    </div>
  );
}
