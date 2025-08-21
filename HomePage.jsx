import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/buses');
  };

  return (
    <div className="home-container">
      <div className="overlay">
        <h1 className="home-title">Welcome to SwiftBus</h1>
        <p className="home-subtitle">
          Book your bus tickets with ease and travel comfortably across your favourite destinations.
        </p>
        <button className="home-btn" onClick={handleExplore}>
          Explore Buses
        </button>
      </div>
    </div>
  );
};

export default HomePage;
