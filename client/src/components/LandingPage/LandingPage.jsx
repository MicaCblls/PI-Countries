import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./LandingPage.module.css";
import oceanVideo from "../../video/oceanVideo.mp4.mp4";

export default function LandingPage() {
  return (
    <div className={styles.landingContainer}>
      <video
        src={oceanVideo}
        autoPlay
        loop
        muted
        className={styles.backVideo}
        type="video/mp4"
      />
      <div className={styles.landingContent}>
        <h1 className={styles.landingTitle}>
          Hi! Are you ready to explore the world?
        </h1>
        <NavLink to={"/home"} activeClassName={styles.activeHome}>
          <button className={styles.landingButton}>Click here!</button>
        </NavLink>
      </div>
    </div>
  );
}
