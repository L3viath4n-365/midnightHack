import React, { useState } from 'react';
import './App.css';

function App() {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [equipmentValue, setEquipmentValue] = useState('');
  const [healthStatus, setHealthStatus] = useState('');
  const [securityClearance, setSecurityClearance] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [requirements, setRequirements] = useState<string[]>([]);

  const handleCheck = async () => {
    if (!departure || !destination) {
      setResult('Please select both countries.');
      setRequirements([]);
      return;
    }

    setLoading(true);
    setResult('');
    setRequirements([]);

    try {
      const response = await fetch('http://localhost:3000/api/travel-rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          departure,
          destination,
          equipmentValue,
          healthStatus,
          securityClearance,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setResult('Error: ' + data.error);
        setRequirements([]);
      } else {
        setResult('OK: ' + data.message);
        setRequirements(data.requirements || ['Valid passport required']);
      }
    } catch (error) {
      setResult('MOCK: ' + departure + ' to ' + destination + ' (backend not running)');
      setRequirements([]);
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
              <div className="profile-name">MLH Hacker</div>
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

        <label className="form-label">Equipment Value (USD)</label>
        <input
          type="number"
          className="form-input"
          placeholder="e.g., 15000"
          value={equipmentValue}
          onChange={(e) => setEquipmentValue(e.target.value)}
        />

        <label className="form-label">Health Status</label>
        <select
          className="form-select"
          value={healthStatus}
          onChange={(e) => setHealthStatus(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="FULLY_VACCINATED">Fully Vaccinated</option>
          <option value="PARTIALLY_VACCINATED">Partially Vaccinated</option>
          <option value="NOT_VACCINATED">Not Vaccinated</option>
        </select>

        <label className="form-label">Security Clearance</label>
        <select
          className="form-select"
          value={securityClearance}
          onChange={(e) => setSecurityClearance(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="CERTIFIED">Certified</option>
          <option value="PENDING">Pending</option>
          <option value="NONE">None</option>
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

        {requirements.length > 0 && (
          <div className="requirements-box">
            <h4>Requirements</h4>
            <ul>
              {requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
