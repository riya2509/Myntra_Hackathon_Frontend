// import "./App.css";
// import BidFunc from "./BidFunc";

// function App() {
//   return (
//     <div className="App">
//       <BidFunc />;
//     </div>
//   );
// }

// export default App;

import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Card from "./components/Card";
import Streak from "./components/Streak";
import shoesImage from "./assets/shoes.png";
import dressesImage from "./assets/dresses.png";
import handbagsImage from "./assets/handbags.png";
import BidFunc from "./BidFunc";

function App() {
  const mockStreak = 19;
  const location = useLocation();
  console.log(location);
  return (
    <div className="App">
      {!location.pathname.includes("/auction") && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/bidding"
          element={
            <>
              <div className="streak-container">
                <Streak streak={mockStreak} />
              </div>
              <main className="main">
                <Card
                  title="Shoes"
                  time="10:00 am - 10:05 am"
                  imageUrl={shoesImage}
                  link={"/auction"}
                />
                <Card
                  title="Dresses"
                  time="01:00 pm - 01:05 pm"
                  imageUrl={dressesImage}
                />
                <Card
                  title="Handbags"
                  time="05:00 pm - 05:05 pm"
                  imageUrl={handbagsImage}
                />
              </main>
            </>
          }
        />
        <Route path="/auction" element={<BidFunc />} />
        <Route path="/dresses" element={<div>Dresses Page</div>} />
        <Route path="/handbags" element={<div>Handbags Page</div>} />
      </Routes>
    </div>
  );
}

export default App;
