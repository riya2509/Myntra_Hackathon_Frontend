// LandingPage.js
import React from 'react';
import './LandingPage.css';
import landingImage from '../assets/landingImage.svg'; // Make sure this path is correct
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <img src={landingImage} alt="Landing" className="landing-image" />
            <Link to="/bidding" className="bid-link">
                <button className="bid-button">BID NOW</button>
            </Link>
        </div>
    );
};

export default LandingPage;
