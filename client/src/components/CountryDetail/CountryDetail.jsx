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
          <p>{countryDetail.id}</p>
          <p>{countryDetail.continent}</p>
          <p>{countryDetail.capital}</p>
          <p>{countryDetail.subregion}</p>
          <p>{countryDetail.area} km2</p>
          <p>{countryDetail.population}</p>
          <h3 className={styles.touristActivitiesTitle}>Tourist activity:</h3>
          {countryDetail.touristActivities?.length ? (
            countryDetail.touristActivities.map((e) => {
              return (
                <div className={styles.touristActivity} key={e.id}>
                  <p>{e.name}</p>
                  <p>{e.season}</p>
                  <p>{e.duration} h</p>
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
