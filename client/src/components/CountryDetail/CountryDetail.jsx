import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getContryById } from "../../store/actions";
import styles from "./CountryDetail.module.css";

export default function CountryDetail({ data }) {
  let params = useParams();
  let dispatch = useDispatch();
  let countryDetail = data.countryDetail;
  useEffect(() => {
    dispatch(getContryById(params.id));
  }, []);

  return (
    <React.Fragment>
      <div className={styles.detailContainer}>
        <img
          src={countryDetail.flag}
          alt={`Flag of ${countryDetail.name}`}
          className={styles.detailImg}
        />
        <div className={styles.detailTextContainer}>
          <h2 className={styles.detailTitleCountry}>{countryDetail.name}</h2>
          <span>Code:</span>
          <p>{countryDetail.id}</p>
          <span>Contient:</span>
          <p>{countryDetail.continent}</p>
          <span>Capital:</span>
          <p>{countryDetail.capital}</p>
          <span>Subregión:</span>
          <p>{countryDetail.subregion}</p>
          <span>Area:</span>
          <p>{countryDetail.area} km2</p>
          <span>Population:</span>
          <p>{countryDetail.population}</p>
          <h3 className={styles.touristActivitiesTitle}>Tourist activity:</h3>
          {countryDetail.touristActivities?.length ? (
            countryDetail.touristActivities.map((e) => {
              return (
                <div className={styles.touristActivity} key={e.id}>
                  <span>Name:</span>
                  <p>{e.name}</p>
                  <span>Season:</span>
                  <p>{e.season}</p>
                  <span>Duration:</span>
                  <p>{e.duration} h</p>
                  <span>Difficulty:</span>
                  <p>{e.difficulty} points</p>
                </div>
              );
            })
          ) : (
            <p>There're no activities in this country yet...</p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
