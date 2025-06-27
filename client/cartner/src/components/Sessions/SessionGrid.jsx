import React from "react";
import SessionCard from "./SessionCard";
import avatar1 from "../../assets/sessions/user1.png";
import avatar2 from "../../assets/sessions/user2.png";
import avatar3 from "../../assets/sessions/user3.png";
import avatar4 from "../../assets/sessions/user4.png";
import "../../styles/SessionGrid.css";

const SessionsGrid = () => {
  const sessionData = [
    {
      title: "Holiday Shopping",
      description: "Planning gifts together for the holidays.",
      participants: [avatar1, avatar2, avatar3, avatar4, avatar1, avatar2],
      budget: 500,
      cartTotal: 1500,
      savings: 1000,
    },
    {
      title: "Apartment Furnishing",
      description: "Collaborating to furnish our new apartment",
      participants: [avatar1, avatar2, avatar3, avatar4],
      budget: 2000,
      cartTotal: 720,
      savings: 1280,
    },
    {
      title: "Tech Gadgets",
      description: "Collecting tech items we want to buy",
      participants: [avatar1, avatar2, avatar3, avatar4],
      budget: 1200,
      cartTotal: 450,
      savings: 750,
    },
    {
      title: "Fitness Gear",
      description: "Pooling resources for fitness equipment",
      participants: [avatar1, avatar2, avatar3, avatar4],
      budget: 800,
      cartTotal: 300,
      savings: 500,
    },
    {
      title: "Travel Essentials",
      description: "Planning our next trip together in the Maldives",
      participants: [avatar1, avatar2, avatar3, avatar4],
      budget: 1000,
      cartTotal: 600,
      savings: 400,
    },
    {
      title: "Home Decor",
      description: "Choosing decor items for our shared space",
      participants: [avatar1, avatar2, avatar3, avatar4],
      budget: 700,
      cartTotal: 250,
      savings: 450,
    },
    {
      title: "Grocery Shopping",
      description: "Collaborating on our weekly grocery list",
      participants: [avatar1, avatar2, avatar3, avatar4],
      budget: 300,
      cartTotal: 180,
      savings: 120,
    },
    {
      title: "Outdoor Adventures",
      description: "Planning outdoor activities and gear",
      participants: [avatar1, avatar2, avatar3, avatar4],
      budget: 600,
      cartTotal: 400,
      savings: 200,
    },
    {
      title: "Book Club",
      description: "Collecting books for our reading list",
      participants: [avatar1, avatar2, avatar3, avatar4],
      budget: 400,
      cartTotal: 200,
      savings: 200,
    },
    {
      title: "Pet Supplies",
      description: "Pooling resources for pet care items",
      participants: [avatar1, avatar2, avatar3, avatar4],
      budget: 500,
      cartTotal: 350,
      savings: 150,
    },
    {
      title: "Fashion Finds",
      description: "Collaborating on our fashion wishlist",
      participants: [avatar1, avatar2, avatar3, avatar4],
      budget: 900,
      cartTotal: 700,
      savings: 200,
    },
    {
      title: "DIY Projects",
      description: "Planning our next DIY project together",
      participants: [avatar1, avatar2, avatar3, avatar4],
      budget: 400,
      cartTotal: 250,
      savings: 150,
    },
    {
      title: "Movie Night",
      description: "Collecting items for our movie night",
      participants: [avatar1, avatar2, avatar3, avatar4],
      budget: 200,
      cartTotal: 100,
      savings: 100,
    },
  ];

  return (
    <div className="session-grid-wrap">
      <p className="dotlength">You have ({sessionData.length}) Active Sessions Ongoing</p>
      {sessionData.map((session, index) => (
        <SessionCard key={index} {...session} />
      ))}
    </div>
  );
};

export default SessionsGrid;
