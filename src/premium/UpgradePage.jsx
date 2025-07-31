import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import './UpgradePage.css';

const UpgradePage = () => {
  const { currentUser } = useContext(AuthContext);

  const handleSubscribe = async (plan) => {
    alert(`Stripe checkout for: ${plan} — mock only for now`);
    // Replace this with actual Stripe checkout integration when you're ready
    // On success, update Firestore to set user.premium = true
  };

  return (
    <div className="upgrade-container">
      <h2>Upgrade to Premium</h2>
      <p>Unlock all features, advanced filters, and match visibility.</p>

      <div className="pricing-options">
        <div className="plan-card">
          <h3>Monthly</h3>
          <p>$16.99/month</p>
          <button onClick={() => handleSubscribe('monthly')}>Subscribe</button>
        </div>

        <div className="plan-card">
          <h3>3 Months</h3>
          <p>$44.99 ($14.99/mo)</p>
          <button onClick={() => handleSubscribe('3month')}>Subscribe</button>
        </div>

        <div className="plan-card">
          <h3>6 Months</h3>
          <p>$77.94 ($12.99/mo)</p>
          <button onClick={() => handleSubscribe('6month')}>Subscribe</button>
        </div>
      </div>

      <div className="premium-benefits">
        <h4>Premium Features Include:</h4>
        <ul>
          <li>Unlimited profile views</li>
          <li>See who viewed you</li>
          <li>View others’ ratings</li>
          <li>Advanced search filters</li>
          <li>Unlimited invites & matches</li>
          <li>See who’s online</li>
          <li>Video chat access</li>
          <li>Boosted search visibility</li>
          <li>Read receipts on messages</li>
          <li>Filter by dating intent</li>
        </ul>
      </div>
    </div>
  );
};

export default UpgradePage;
