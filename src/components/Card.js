import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

const Card = ({ title, time, imageUrl, link }) => {
    return (
        <Link to={link} className="card-link">
            <div className="card" style={{ backgroundImage: `url(${imageUrl})` }}>
                <div className="card-content">
                    <h2>{title}</h2>
                    <p>Time: {time}</p>
                </div>
            </div>
        </Link>
    );
};

export default Card;
