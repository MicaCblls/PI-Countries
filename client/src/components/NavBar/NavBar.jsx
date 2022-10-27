import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  cleaner,
  cleanError,
  filterCountriesByContinent,
  filterCountriesByActivity,
  getCountriesByName,
  getCountriesOrdered,
} from "../../store/actions";
import Button from "../Button/Button";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar({ data, setCurrentPage }) {
  const countriesBackUp = data.countriesBackUp;
  const continents = [
    ...new Set(countriesBackUp.map((country) => country.continent)),
  ];
  let dispatch = useDispatch();
  let [name, setName] = useState("");
  let [order, setOrder] = useState("");
  let [filter, setFilter] = useState("");

  const handleChange = (e) => {
    e.preventDefault();

    if (data.error) {
      dispatch(cleanError());
    }
    setName(e.target.value);
  };
  const handleOrder = (e) => {
    e.preventDefault();
    setOrder(e.target.value);
    dispatch(getCountriesOrdered(e.target.value));
    setCurrentPage(1);
    setOrder("");
  };

  const handleFilterByContinet = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
    dispatch(filterCountriesByContinent(e.target.value));
    setCurrentPage(1);
    setFilter("");
  };

  const handleFilterByActivity = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
    dispatch(filterCountriesByActivity(e.target.value));
    setCurrentPage(1);
    setFilter("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getCountriesByName(name));
    setCurrentPage(1);
    setName("");
  };

  return (
    <React.Fragment>
      <nav className={styles.navContainer}>
        <form onSubmit={handleSubmit} className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search countries by name..."
            value={name}
            onChange={handleChange}
            className={styles.searchInput}
          />
          <Button type="submit">
            <span class="material-symbols-outlined">travel_explore</span>
          </Button>
        </form>

        <select
          name="filterByContinent"
          id="filterByContinent"
          value={filter}
          onChange={handleFilterByContinet}
          className={styles.filterContinent}
        >
          <option>-Filter by continent-</option>
          {continents.map((continent) => {
            return (
              <option key={continent} value={continent}>
                {continent}
              </option>
            );
          })}
        </select>
        <select
          name="filterByActivity"
          id="filterByActivity"
          value={filter}
          onChange={handleFilterByActivity}
          className={styles.filterActivity}
        >
          <option>-Filter by activity-</option>
          {data.touristActivities.length ? (
            data.touristActivities.map((activity) => {
              return (
                <option key={activity.id} value={activity.name}>
                  {activity.name}
                </option>
              );
            })
          ) : (
            <option>No activities created</option>
          )}
        </select>
        <select
          name="order"
          id="order"
          value={order}
          onChange={handleOrder}
          className={styles.order}
        >
          <option>-Order alphabetically-</option>
          <option value="orderAtoZ">Order from A to Z</option>
          <option value="orderZtoA">Order from Z to A</option>
          <option>-Order population-</option>
          <option value="ascending">Population highest to lowest</option>
          <option value="descending">Population lowest to highest</option>
        </select>
        <Button
          onClick={(e) => {
            dispatch(cleaner());
          }}
          variant="secondary"
        >
          All countries
        </Button>

        <NavLink to="/create">
          <Button variant="secondary">Click here to create activities!</Button>
        </NavLink>
      </nav>
    </React.Fragment>
  );
}
