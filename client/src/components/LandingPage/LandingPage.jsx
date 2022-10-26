import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.landingContainer}>
      <h1 className={styles.landingTitle}>
        Hi! Are you ready to see the world?
      </h1>
      <NavLink to={"/home"} activeClassName={styles.activeHome}>
        <button className={styles.landingButton}>Click here!</button>
      </NavLink>
    </div>
  );
}
