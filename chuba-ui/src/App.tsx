import React, { useState } from 'react';
import './App.css';

function App() {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!departure || !destination) {
      setResult('Please select both countries.');
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const response = await fetch('http://localhost:3000/api/travel-rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ departure, destination }),
      });

      const data = await response.json();

      if (data.error) {
        setResult('Error: ' + data.error);
      } else {
        setResult('OK: ' + data.message);
      }
    } catch (error) {
      setResult('MOCK: ' + departure + ' to ' + destination + ' (backend not running)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="app-card">
        <h1 className="app-title">Chuba</h1>
        <p className="app-subtitle">Privacy-preserving travel eligibility</p>

        <div className="profile-card">
          <div className="profile-content">
            <span className="profile-icon">[H]</span>
            <div>
              <div className="profile-name">D3vX</div>
              <div className="profile-detail">Elite Hacker (Brazil to UK)</div>
            </div>
          </div>
          <div className="profile-badge">ZK-Protected</div>
        </div>

        <label className="form-label">Departure Country</label>
        <select
          className="form-select"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="BRA">Brazil</option>
          <option value="USA">USA</option>
          <option value="GBR">United Kingdom</option>
          <option value="FRA">France</option>
          <option value="DEU">Germany</option>
          <option value="JPN">Japan</option>
        </select>

        <label className="form-label">Destination Country</label>
        <select
          className="form-select"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="BRA">Brazil</option>
          <option value="USA">USA</option>
          <option value="GBR">United Kingdom</option>
          <option value="FRA">France</option>
          <option value="DEU">Germany</option>
          <option value="JPN">Japan</option>
        </select>

        <button
          className="check-button"
          onClick={handleCheck}
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Check Eligibility'}
        </button>

        {result && (
          <div className={'result-box' + (result.includes('MOCK') ? ' mock' : '')}>
            {result}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
