import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../Boton/Button";
import styles from "./CountryCard.module.css";
export default function CountryCard({ name, continent, flag, id }) {
  return (
    <React.Fragment>
      <div className={styles.container}>
        <img src={flag} alt={`Flag of ${name}`} className={styles.img} />
        <div className={styles.textContainer}>
          <h2 className={styles.titleCountry}>{name}</h2>
          <p>Code: {id}</p>
          <p>Contient: {continent}</p>
        </div>
        <NavLink to={`/details/${id}`}>
          <Button variant="secondary">Read more</Button>
        </NavLink>
      </div>
    </React.Fragment>
  );
}
