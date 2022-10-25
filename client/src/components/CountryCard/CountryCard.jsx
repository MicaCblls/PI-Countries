import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./CountryCard.css";
export default function CountryCard({ name, continent, flag, id }) {
  return (
    <React.Fragment>
      <div className="container">
        <img src={flag} alt={`Flag of ${name}`} className={styles.img} />
        <div className={styles.textContainer}>
          <h2 className={styles.titleCountry}>{name}</h2>
          <p>Code: {id}</p>
          <p>Contient: {continent}</p>
        </div>
        <NavLink to={`/details/${id}`}>
          <button className={styles.detailButton}>READ MORE</button>
        </NavLink>
      </div>
    </React.Fragment>
  );
}
