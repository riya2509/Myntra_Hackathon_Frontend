import React, { useState, useEffect } from "react";
import "./BidFunc.css";

const BidFunc = () => {
  const maxBids = 3;
  const originalPrice = 500;
  const initialCash = 1000;
  const [currentPrice, setCurrentPrice] = useState(originalPrice);
  const [bidAmount, setBidAmount] = useState("");
  const [bidCount, setBidCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const [timerEnded, setTimerEnded] = useState(false);
  const [cashRemaining, setCashRemaining] = useState(initialCash);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          setTimerEnded(true);
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleBidInput = (e) => {
    setBidAmount(e.target.value);
  };

  const handleBid = () => {
    const bidValue = parseInt(bidAmount, 10);
    if (
      bidValue > currentPrice &&
      bidCount < maxBids &&
      bidValue <= cashRemaining
    ) {
      setCurrentPrice(bidValue);
      setBidCount(bidCount + 1);
      setCashRemaining(cashRemaining - bidValue);
      setBidAmount("");
    }
  };

  return (
    <div>
      <header>
        <div className="logo_container">
          <a href="#">
            <img
              className="myntra_home"
              src="myntra_logo.webp"
              alt="Myntra Home"
            />
          </a>
        </div>
        <nav className="nav_bar">
          <h1>Myntra Cash Remaining: ₹{cashRemaining}</h1>
        </nav>
      </header>
      <div className="card">
        <img
          src="product-image.jpg"
          alt="Product Image"
          className="product-image"
        />
        <div className="product-details">
          <h2 className="product-name">Product Name</h2>
          <p className="seller">Seller: John Doe</p>
          <p className="original-price">Original Price: ₹{originalPrice}</p>
          <p className="current-price">Current Price: ₹{currentPrice}</p>
          <p className="time-remaining">
            Time Remaining:{" "}
            <span id="time">
              {Math.floor(timeRemaining / 60)}:
              {timeRemaining % 60 < 10 ? "0" : ""}
              {timeRemaining % 60}
            </span>{" "}
            mins
          </p>
          <input
            type="number"
            value={bidAmount}
            onChange={handleBidInput}
            placeholder="Enter your bid"
          />
          <button
            onClick={handleBid}
            disabled={
              bidAmount <= currentPrice ||
              bidCount >= maxBids ||
              timerEnded ||
              bidAmount > cashRemaining
            }
          >
            {bidCount >= maxBids
              ? "Max Bids Reached"
              : timerEnded
              ? "Auction Ended"
              : "Bid"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BidFunc;
