import React, { useState, useEffect } from "react";
import "./BidFunc.css";
import axios from "axios";
import socket from "./socket";

// const initialProducts = [
//   {
//     id: 1,
//     name: "Adidas Shoes",
//     seller: "Seller A",
//     image: "/images/adidas.jpeg",
//     originalPrice: 1000,
//     currentPrice: 1000,
//     timeRemaining: 300,
//   },
//   {
//     id: 2,
//     name: "Bruton Shoes",
//     seller: "Seller B",
//     image: "/images/bruton.jpeg",
//     originalPrice: 1500,
//     currentPrice: 1500,
//     timeRemaining: 300,
//   },
//   {
//     id: 3,
//     name: "Nike Shoes",
//     seller: "Seller C",
//     image: "/images/nike.jpeg",
//     originalPrice: 2000,
//     currentPrice: 2000,
//     timeRemaining: 300,
//   },
//   {
//     id: 4,
//     name: "Redtape Shoes",
//     seller: "Seller D",
//     image: "/images/redtape.jpeg",
//     originalPrice: 2500,
//     currentPrice: 2500,
//     timeRemaining: 300,
//   },
//   {
//     id: 5,
//     name: "Skate Shoes",
//     seller: "Seller E",
//     image: "/images/skate.jpeg",
//     originalPrice: 3000,
//     currentPrice: 3000,
//     timeRemaining: 300,
//   },
//   {
//     id: 6,
//     name: "Decathlon shoes",
//     seller: "Seller F",
//     image: "/images/decathlon.jpeg",
//     originalPrice: 3500,
//     currentPrice: 3500,
//     timeRemaining: 300,
//   },
// ];

const BidFunc = () => {
  const maxBids = 3;
  const initialCash = 4000;
  const [products, setProducts] = useState([]);
  const [bidAmounts, setBidAmounts] = useState([]);
  //   const [bidCounts, setBidCounts] = useState(Array(products.length).fill(0));
  const [bidCounts, setBidCounts] = useState([]);
  const [cashRemaining, setCashRemaining] = useState(initialCash);
  const [currentBidValue, setcurrentBidValue] = useState({});

  //   console.log(bidAmounts);
  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.info(socket?.id);
      console.log("Connected to server");
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    socket.emit("bid:get_detail");
    socket.on("bid:cost", (val) => {
      console.log(
        Object.entries(JSON.parse(atob(val))).map(([key, value]) => value.cost)
      );
      setcurrentBidValue(JSON.parse(atob(val)));
    });
    return () => {
      console.info("SOCKET CALLED OFF");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    axios
      .get("/api")
      .then((res) => {
        const productData = (res.data?.data ?? []).map((v) => ({
          ...v,
          timeRemaining: 300,
        }));
        setProducts(productData);
        setBidCounts(Array(productData.length).fill(0)); // Initialize bidCounts properly
        setBidAmounts(Array(productData.length).fill(""));
      })
      .catch((e) => {
        console.info(e);
      });
  }, []);

  //   useEffect(() => {
  //     axios
  //       .get("/api")
  //       .then((res) => {
  //         setProducts(
  //           (res.data?.data ?? []).map((v) => ({ ...v, timeRemaining: 300 }))
  //         );
  //       })
  //       .catch((e) => {
  //         console.info(e);
  //       });
  //   }, []);

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

  const addBidding = (index, id) => {
    // if (value > currentBidValue) {
    socket.emit("bid:add", { id, value: Number(bidAmounts[index]) });
    // console.log(currentBidValue);
    // const j = { ...currentBidValue };

    // console.log(bidAmounts[index], j[id].cost);

    // if (bidAmounts[index] > j[id].cost) {
    //   j[id].cost = bidAmounts[index];
    //   setcurrentBidValue(j);
    // }
  };

  const handleBid = (index, id) => {
    const bidValue = parseInt(bidAmounts[index], 10);
    // const product = products[index];
    addBidding(index, id);
    const j = { ...currentBidValue };
    // const currentProductBidValue =
    //   currentBidValue[id]?.cost ?? products[index].cost;

    // console.log(bidValue, j[id].cost, cashRemaining, bidCounts[index]);
    if (
      bidValue > j[id].cost &&
      (bidCounts[index] ?? 0) < maxBids &&
      bidValue <= cashRemaining + j[id].cost
    ) {
      const usedCash = bidValue - j[id].cost;
      //   if (bidAmounts[index] > j[id].cost) {
      j[id].cost = bidAmounts[index];
      setcurrentBidValue(j);
      //   console.log(currentBidValue);
      //   }
      //   setProducts((prevProducts) =>
      //     prevProducts.map((p, i) =>
      //       i === index ? { ...p, currentPrice: bidValue } : p
      //     )
      //   );
      setBidCounts((prevCounts) =>
        prevCounts.map((count, i) => (i === index ? count + 1 : count))
      );
      setCashRemaining(cashRemaining - usedCash);
      setBidAmounts((prevBidAmounts) =>
        prevBidAmounts.map((amount, i) => (i === index ? "" : amount))
      );
      addBidding(index, id);
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
              src={`data:image/*;base64,${product.image}`}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <h2 className="product-name">{product.name}</h2>
              <p className="description">Description: {product.description}</p>
              <p className="original-price">
                Original Price: ₹{product.actualCost}
              </p>
              <p className="current-price">
                Current Price: ₹
                {currentBidValue[product.id]?.cost
                  ? currentBidValue[product.id].cost
                  : product.cost}
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
                onClick={() => handleBid(index, product.id)}
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
