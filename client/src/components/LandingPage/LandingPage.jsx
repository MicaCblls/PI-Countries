import React from "react";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Hi! Are you ready to see the world?</h1>
      <NavLink to={"/home"} activeClassName="activeHome">
        <button className="landing-button">Click here!</button>
      </NavLink>
    </div>
  );
}
