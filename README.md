# Myntra Auction Feature

This project implements an auction feature for Myntra's website, offering a dynamic and engaging user experience with an enhanced UI. The feature includes a landing page with an advertisement for the auction, featuring a prominent "BID New" button in the header. Users can navigate to category-specific auction pages where auctions for different categories are displayed. Each category page allows users to bid using Myntra Cash, with bid amounts updating in real-time.

## Table of Contents
- [Introduction](#introduction)
- [Proposed Solution](#proposed-solution)
- [Features](#features)
- [Feasibility & Tech Stack](#feasibility--tech-stack)
- [Setup](#setup)
- [Usage](#usage)
- [Future Scope](#future-scope)

## Introduction

The auction feature allows Myntra users to bid on premium items in a fun and interactive way. This feature aims to increase user engagement and retention by providing exclusive benefits to prime members and gamifying the shopping experience with rewards and bonus coins.

## Proposed Solution

Implement a dynamic bidding/auction feature within the Myntra app. Auctions are exclusive to prime members to ensure platform stability and attract quality users, while also promoting membership upgrades.

## Features

### Landing Page with "BID New" Button

The landing page serves as the entry point for users to explore the auction feature within the Myntra app. It prominently displays an advertisement for the auction and includes a "BID New" button in the header to highlight the availability of auctions.

![Landing Page](https://github.com/riya2509/Myntra_HackerRamp_Frontend/raw/main/src/assets/Landing-page.png)

### Category-Specific Auction Pages

Users can navigate to category-specific pages within the Myntra app to view auctions for different product categories such as shoes, dresses, and handbags. Each category page displays cards of upcoming auctions, enabling users to track all auctions in one place.

![Category Page](https://github.com/riya2509/Myntra_HackerRamp_Frontend/raw/main/src/assets/category-page.png)

### Bidding Grounds

Upon clicking on a specific auction card within the Myntra app, users enter the bidding ground where they can participate in the auction using Myntra Cash. The bid amounts update dynamically, showing the current highest bid in real-time, fostering a competitive bidding environment.

![Bidding Ground](https://github.com/riya2509/Myntra_HackerRamp_Frontend/raw/main/src/assets/bidding-ground.jpeg)

### Streak Option

The feature includes a streak option within the Myntra app that encourages users to participate consistently in auctions. This gamification element rewards users with Supercoins for maintaining a streak of consecutive winning bids, enhancing user engagement.

## Feasibility & Tech Stack

### Feasibility

The auction feature is highly feasible within the Myntra app with existing technologies and can be seamlessly integrated into the current platform. The MERN Stack ensures a robust and scalable solution, capable of handling the dynamic requirements of the auction feature.

### Tech Stack

- **Frontend:** React.js for building a responsive and dynamic user interface within the Myntra app.
- **Backend:** Node.js and Express.js for efficient handling of auction logic and user requests.
- **Additional Tools:**
  - **WebSocket:** For real-time bidding updates within the Myntra app, ensuring users receive immediate feedback on their bids.

## Setup

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/riya2509/Myntra_HackerRamp_Frontend.git
    ```
2. Navigate to the project directory:
    ```sh
    cd Myntra_HackerRamp_Frontend
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

## Usage

### Running the Development Server

1. Start the development server:
    ```sh
    npm start
    ```
    or
    ```sh
    yarn start
    ```
2. Open your browser and navigate to `http://localhost:3000`.

### Navigating the Application

- **Landing Page:** Upon landing in the Myntra app, users see an advertisement for the auction feature and can immediately access the "BID New" button in the header.
- **Category Pages:** Each category page within the Myntra app displays cards of different auction categories scheduled at various times. Clicking on a card navigates users to the bidding ground for that category.
- **Bidding Grounds:** Here, within the Myntra app, users can participate in auctions using Myntra Cash. The bid amount updates in real-time, reflecting the current highest bid.
- **Streak Option:** Within the Myntra app, users are encouraged to participate consistently with the streak option, earning Supercoins for consecutive winning bids.

## Future Scope

- **Authentication Services:** Implement off-the-shelf authentication services to enhance security and user management within the Myntra app.
  
- **Bid Price Delay:** Introduce a deliberate delay in displaying the most recent bid price to users. This delay aims to prevent excessive fluctuations and ensure a stable bidding experience within the Myntra app.


