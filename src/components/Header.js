// Header.js
import React from 'react';
import './Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import myntraLogo from '../assets/myntra-2.svg';

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <Link to="/">
                    <img src={myntraLogo} alt="Myntra Logo" className="header-logo" />
                </Link>
                <nav>
                    <ul>
                        <li>MEN</li>
                        <li>WOMEN</li>
                        <li>KIDS</li>
                        <li>HOME & LIVING</li>
                        <li>BEAUTY</li>
                        <li>STUDIO</li>
                        <Link to="/bidding" className="new">
                            <li>BID <span className="new-badge">NEW</span></li>
                        </Link>
                    </ul>
                </nav>
            </div>
            <div className="header-right">
                <input type="text" placeholder="Search for products, brands and more" className="header-search" />
                <div className="header-icons">
                    <div className="header-icon">
                        <i className="fas fa-user"></i>
                        <span>Profile</span>
                    </div>
                    <div className="header-icon">
                        <i className="fas fa-heart"></i>
                        <span>Wishlist</span>
                    </div>
                    <div className="header-icon">
                        <i className="fas fa-shopping-bag"></i>
                        <span>Bag</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
