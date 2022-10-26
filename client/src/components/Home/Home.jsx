import React from "react";
import CountryCard from "../CountryCard/CountryCard";
import styles from "./Home.module.css";

export default function Home({ data }) {
  if (data.length) {
    return (
      <div className={styles.countriesContainer}>
        <div className={styles.cards}>
          {data.map((country) => {
            return (
              <CountryCard
                key={country.id}
                flag={country.flag}
                name={country.name}
                continent={country.continent}
                id={country.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else return <h1>Loading...</h1>;
}
