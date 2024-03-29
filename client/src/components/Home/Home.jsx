import React from "react";
import CountryCard from "../CountryCard/CountryCard";
import styles from "./Home.module.css";

export default function Home({ data }) {
  if (data.length) {
    return (
      <div className="flex flex-col mt-28  items-center justify-center w-full flex-1">
        <div className="flex flex-wrap gap-4 p-4 w-full justify-center">
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
  } else
    return (
      <>
        <h1 className={styles.loadingTitle}>Loading...</h1>
        <div className={styles.loading}></div>
      </>
    );
}
