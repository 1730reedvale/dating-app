import React, { useState } from 'react';
import { API_BASE } from '../api/base';

export default function GoPremiumButton({ label = 'Go Premium' }) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (!API_BASE) {
      alert('API base URL is not set.');
      return;
    }
    setLoading(true);
    // Redirect to backend checkout endpoint
    window.location.href = `${API_BASE}/api/stripe/test-checkout`;
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={{
        padding: '12px 20px',
        borderRadius: '9999px',
        border: 'none',
        cursor: loading ? 'not-allowed' : 'pointer',
        fontWeight: 600,
        fontSize: '16px',
        background: loading ? '#b85c00' : '#e67300', // darker elegant orange when loading
        color: 'white',
        boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
        transition: 'transform 120ms ease, opacity 120ms ease',
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      aria-label="Go Premium"
    >
      {loading ? 'Opening checkout…' : label}
    </button>
  );
}
