import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getContryById } from "../../store/actions";
import "./CountryDetail.css";

export default function CountryDetail({ data }) {
  let params = useParams();
  let dispatch = useDispatch();
  let countryDetail = data.countryDetail;
  useEffect(() => {
    dispatch(getContryById(params.id));
  }, []);

  return (
    <React.Fragment>
      <div className="detail-container">
        <img
          src={countryDetail.flag}
          alt={`Flag of ${countryDetail.name}`}
          className="detail-img"
        />
        <div className="detail-text-container">
          <h2 className="detail-title-country">{countryDetail.name}</h2>
          <p>Code: {countryDetail.id}</p>
          <p>Contient: {countryDetail.continent}</p>
          <p>Capital: {countryDetail.capital}</p>
          <p>Subregión: {countryDetail.subregion}</p>
          <p>Area: {countryDetail.area} km2</p>
          <p>Population: {countryDetail.population}</p>
          <h3>Tourist activity:</h3>
          {countryDetail.touristActivities?.length ? (
            countryDetail.touristActivities.map((e) => {
              return (
                <div key={e.id}>
                  <p>Name: {e.name}</p>
                  <p>Season: {e.season}</p>
                  <p>Duration: {e.duration} h</p>
                  <p>Difficulty: {e.difficulty}</p>
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
