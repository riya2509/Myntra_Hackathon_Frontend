import React, { useState, useEffect } from "react";
import "./BidFunc.css";

const initialProducts = [
  {
    id: 1,
    name: "Adidas Shoes",
    seller: "Seller A",
    image: "/images/adidas.jpeg",
    originalPrice: 1000,
    currentPrice: 1000,
    timeRemaining: 300,
  },
  {
    id: 2,
    name: "Bruton Shoes",
    seller: "Seller B",
    image: "/images/bruton.jpeg",
    originalPrice: 1500,
    currentPrice: 1500,
    timeRemaining: 300,
  },
  {
    id: 3,
    name: "Nike Shoes",
    seller: "Seller C",
    image: "/images/nike.jpeg",
    originalPrice: 2000,
    currentPrice: 2000,
    timeRemaining: 300,
  },
  {
    id: 4,
    name: "Redtape Shoes",
    seller: "Seller D",
    image: "/images/redtape.jpeg",
    originalPrice: 2500,
    currentPrice: 2500,
    timeRemaining: 300,
  },
  {
    id: 5,
    name: "Skate Shoes",
    seller: "Seller E",
    image: "/images/skate.jpeg",
    originalPrice: 3000,
    currentPrice: 3000,
    timeRemaining: 300,
  },
  {
    id: 6,
    name: "Decathlon shoes",
    seller: "Seller F",
    image: "/images/decathlon.jpeg",
    originalPrice: 3500,
    currentPrice: 3500,
    timeRemaining: 300,
  },
];

const BidFunc = () => {
  const maxBids = 3;
  const initialCash = 1000;
  const [products, setProducts] = useState(initialProducts);
  const [bidAmounts, setBidAmounts] = useState(Array(products.length).fill(""));
  const [bidCounts, setBidCounts] = useState(Array(products.length).fill(0));
  const [cashRemaining, setCashRemaining] = useState(initialCash);

  useEffect(() => {
    const timers = products.map((product, index) =>
      setInterval(() => {
        setProducts((prevProducts) =>
          prevProducts.map((p, i) => {
            if (i === index && p.timeRemaining > 0) {
              return { ...p, timeRemaining: p.timeRemaining - 1 };
            } else {
              return p;
            }
          })
        );
      }, 1000)
    );

    return () => timers.forEach((timer) => clearInterval(timer));
  }, [products]);

  const handleBidInput = (e, index) => {
    const newBidAmounts = [...bidAmounts];
    newBidAmounts[index] = e.target.value;
    setBidAmounts(newBidAmounts);
  };

  const handleBid = (index) => {
    const bidValue = parseInt(bidAmounts[index], 10);
    const product = products[index];

    if (
      bidValue > product.currentPrice &&
      bidCounts[index] < maxBids &&
      bidValue <= cashRemaining + product.currentPrice
    ) {
      const usedCash = bidValue - product.currentPrice;
      setProducts((prevProducts) =>
        prevProducts.map((p, i) =>
          i === index ? { ...p, currentPrice: bidValue } : p
        )
      );
      setBidCounts((prevCounts) =>
        prevCounts.map((count, i) => (i === index ? count + 1 : count))
      );
      setCashRemaining(cashRemaining - usedCash);
      setBidAmounts((prevBidAmounts) =>
        prevBidAmounts.map((amount, i) => (i === index ? "" : amount))
      );
    }
  };

  return (
    <div>
      <header>
        <div className="logo_container">
          <a href="#">
            <img
              className="myntra_home"
              src="images/myntra.webp"
              alt="Myntra Home"
            />
          </a>
        </div>
        <nav className="nav_bar">
          <h1>Myntra Cash Remaining: ₹{cashRemaining}</h1>
        </nav>
      </header>
      <div className="cards-container">
        {products.map((product, index) => (
          <div key={product.id} className="card">
            <img
              src={product.image}
              alt="Product Image"
              className="product-image"
            />
            <div className="product-details">
              <h2 className="product-name">{product.name}</h2>
              <p className="seller">Seller: {product.seller}</p>
              <p className="original-price">
                Original Price: ₹{product.originalPrice}
              </p>
              <p className="current-price">
                Current Price: ₹{product.currentPrice}
              </p>
              <p className="time-remaining">
                Time Remaining:{" "}
                <span id="time">
                  {Math.floor(product.timeRemaining / 60)}:
                  {product.timeRemaining % 60 < 10 ? "0" : ""}
                  {product.timeRemaining % 60}
                </span>{" "}
                mins
              </p>
              <input
                type="number"
                value={bidAmounts[index]}
                onChange={(e) => handleBidInput(e, index)}
                placeholder="Enter your bid"
              />
              <button
                onClick={() => handleBid(index)}
                disabled={
                  bidAmounts[index] <= product.currentPrice ||
                  bidCounts[index] >= maxBids ||
                  product.timeRemaining === 0 ||
                  parseInt(bidAmounts[index], 10) >
                    cashRemaining + product.currentPrice
                }
              >
                {bidCounts[index] >= maxBids
                  ? "Max Bids Reached"
                  : product.timeRemaining === 0
                  ? "Auction Ended"
                  : "Bid"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BidFunc;
