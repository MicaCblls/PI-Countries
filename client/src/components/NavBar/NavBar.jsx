import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  cleaner,
  filterCountriesByContinent,
  filterCountriesByActivity,
  getCountriesByName,
  getCountriesOrdered,
} from "../../store/actions";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar({ data }) {
  const countriesBackUp = data.countriesBackUp;
  const activities = [
    ...new Set(data.touristActivities.map((elem) => elem.name)),
  ];

  const continents = [
    ...new Set(countriesBackUp.map((country) => country.continent)),
  ];
  let dispatch = useDispatch();
  let [name, setName] = useState("");
  let [order, setOrder] = useState("");
  let [filter, setFilter] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleOrder = (e) => {
    e.preventDefault();
    setOrder(e.target.value);
    dispatch(getCountriesOrdered(e.target.value));
    setOrder("");
  };

  const handleFilterByContinet = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
    dispatch(filterCountriesByContinent(e.target.value));
    setFilter("");
  };

  const handleFilterByActivity = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
    dispatch(filterCountriesByActivity(e.target.value));
    setFilter("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getCountriesByName(name));
    setName("");
  };

  return (
    <React.Fragment>
      <nav className="nav-container">
        <form onSubmit={handleSubmit} className="search-bar">
          <input
            type="text"
            placeholder="Search countries by name..."
            value={name}
            onChange={handleChange}
            className="search-input"
          />
          <button type="submit" className="btn search">
            Search
          </button>
        </form>

        <select
          name="filterByContinent"
          id="filterByContinent"
          value={filter}
          onChange={handleFilterByContinet}
          className="filter"
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
          className="filter"
        >
          <option>-Filter by activity-</option>
          {activities.map((activity) => {
            return (
              <option key={activity} value={activity}>
                {activity}
              </option>
            );
          })}
        </select>
        <select
          name="order"
          id="order"
          value={order}
          onChange={handleOrder}
          className="order"
        >
          <option>-Order alphabetically-</option>
          <option value="orderAtoZ">Order from A to Z</option>
          <option value="orderZtoA">Order from Z to A</option>
          <option>-Order population-</option>
          <option value="ascending">Population highest to lowest</option>
          <option value="descending">Population lowest to highest</option>
        </select>
        <button
          onClick={(e) => {
            dispatch(cleaner());
          }}
          className="btn clean"
        >
          All countries
        </button>

        <NavLink to="/create">
          <button className="btn create">
            Click here to create activities!
          </button>
        </NavLink>
      </nav>
    </React.Fragment>
  );
}
