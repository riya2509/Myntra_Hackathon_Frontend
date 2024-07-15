// Streak.js

import React from 'react';
import './Streak.css';
import handbagImage from '../assets/handbag_icon.png'; 

const Streak = ({ streak }) => {
   
    const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S']; //array of a week
    const completedDays = streak % 7; //streak is for a week

    return (
        <div className="streak">
            <div className="streak-header">
                <img src={handbagImage} alt="Streak Icon" className="streak-main-icon" />
                <div className="streak-info">
                    <span className="streak-count">{streak}</span>
                    <span className="streak-text">days streak</span>
                </div>
            </div>
            <div className="streak-days">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="streak-day">
                        <div className={`streak-circle ${index < completedDays ? 'completed' : ''}`}></div>
                        <span className="day-label">{day}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Streak;
