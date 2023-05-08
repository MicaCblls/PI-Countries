import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createActivity,
  cleanError,
  cleanSuccess,
  getActivities,
} from "../../store/actions";
import Success from "../Success/Success";
import Button from "../Button/Button";
import styles from "./CreateActivity.module.css";
import { NavLink } from "react-router-dom";
import { BsArrowBarLeft } from "react-icons/bs";

export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  } else if (!/^[A-Z][a-zA-ZÀ-ÿ\s]{1,40}$/.test(input.name)) {
    errors.name =
      "Name should start with capital letter and contains letters only";
  }
  if (!input.difficulty) {
    errors.difficulty = "Difficulty is required";
  } else if (input.difficulty < 1 || input.difficulty > 5) {
    errors.difficulty = "Only values between 1 and 5 allowed";
  }
  if (!input.duration) {
    errors.duration = "Duration is required";
  } else if (input.duration <= 0) {
    errors.duration =
      "Insert valid time of duration, should be greater than cero";
  }
  if (!input.season) {
    errors.season = "Season is required";
  } else if (!input.season.length) {
    errors.season = "Select one season from the list";
  }
  if (!input.countries.length) {
    errors.countries = "Select at least one country from the list";
  }
  return errors;
}
export default function CreateActivity({ data }) {
  const dispatch = useDispatch();
  let [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });
  let [error, setError] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: "",
  });

  const handleInputChange = (e) => {
    if (data.error) {
      dispatch(cleanError());
    }
    if (data.success) {
      dispatch(cleanSuccess());
    }
    if (e.target.name === "countries") {
      setInput((prev) => ({
        ...prev,
        countries: [...prev.countries, e.target.value],
      }));
    } else {
      setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    let errorObj = validate({ ...input, [e.target.name]: e.target.value });
    setError(errorObj);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    dispatch(createActivity(input));
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
  };
  let disabled = Object.entries(error).length ? true : false;

  return (
    <>
      <NavLink
        onClick={() => dispatch(getActivities())}
        to="/home"
        className="flex self-start items-center font-medium md:text-lg text-blue pt-6 w-full px-4 md:px-8"
      >
        <BsArrowBarLeft className="w-7 h-auto" /> Home
      </NavLink>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <form action="post" className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              id="name"
              className={styles.name}
              value={input.name}
              onChange={handleInputChange}
              placeholder="Insert name..."
            />
            {error.name ? (
              <small className="h-6 text-red-600 text-xs md:text-base text-left">
                {error.name}
              </small>
            ) : null}
            <input
              type="number"
              name="difficulty"
              id="difficulty"
              className={styles.difficulty}
              value={input.difficulty}
              onChange={handleInputChange}
              placeholder="Insert points of difficulty..."
              min={0}
            />
            {error.difficulty ? (
              <small className="h-6 text-red-600 text-xs md:text-base text-left">
                {error.difficulty}
              </small>
            ) : null}

            <input
              type="number"
              name="duration"
              id="duration"
              className={styles.duration}
              value={input.duration}
              onChange={handleInputChange}
              placeholder="Insert time of duration..."
              min={0}
            />
            {error.duration ? (
              <small className="h-6 text-red-600 text-xs md:text-base text-left">
                {error.duration}
              </small>
            ) : null}

            <select
              type="text"
              name="season"
              id="season"
              className={styles.seasonSelect}
              onChange={handleInputChange}
            >
              <option>- Select season -</option>
              <option value="Summer">Summer</option>
              <option value="Winter">Winter</option>
              <option value="Autumn">Autumn</option>
              <option value="Spring">Spring</option>
            </select>
            {error.season ? (
              <small className="h-6 text-red-600 text-xs md:text-base text-left">
                {error.season}
              </small>
            ) : null}

            <select
              name="countries"
              id="countries"
              className={styles.countriesSelect}
              onChange={handleInputChange}
            >
              <option>- Select countries -</option>
              {data.countriesBackUp.length &&
                data.countriesBackUp.map((country) => {
                  return (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  );
                })}
            </select>
            {error.countries ? (
              <small className="h-6 text-red-600 text-xs md:text-base text-left">
                {error.countries}
              </small>
            ) : null}
            <Button type="submit" disabled={disabled}>
              Create activity
            </Button>
            {data.success.length ? <Success success={data.success} /> : null}
          </form>
        </div>
      </div>
    </>
  );
}
