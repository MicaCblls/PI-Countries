import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createActivity } from "../../store/actions";
import "./CreateActivity.css";
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
  let [error, setError] = useState({});

  const handleInputChange = (e) => {
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
  return (
    <div className="form-container">
      <h1>Create activities:</h1>
      <form action="post" className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            value={input.name}
            onChange={handleInputChange}
            placeholder="Insert name..."
          />
          {error.name && <p className="danger">{error.name}</p>}
        </div>
        <label htmlFor="difficulty">Difficulty: </label>
        <div>
          <input
            type="number"
            name="difficulty"
            id="difficulty"
            value={input.difficulty}
            onChange={handleInputChange}
            placeholder="Insert points of difficulty..."
            min={0}
          />
          {error.difficulty && <p className="danger">{error.difficulty}</p>}
        </div>
        <div>
          <label htmlFor="duration">Duration: </label>
          <input
            type="number"
            name="duration"
            id="duration"
            value={input.duration}
            onChange={handleInputChange}
            placeholder="Insert time of duration..."
            min={0}
          />
          {error.duration && <p className="danger">{error.duration}</p>}
        </div>

        <div>
          <label htmlFor="season">Season: </label>
          <select
            type="text"
            name="season"
            id="season"
            onChange={handleInputChange}
          >
            <option value="">- Select season -</option>
            <option value="Summer">Summer</option>
            <option value="Winter">Winter</option>
            <option value="Autumn">Autumn</option>
            <option value="Spring">Spring</option>
          </select>
          {error.season && <p className="danger">{error.season}</p>}
        </div>
        <div>
          <label htmlFor="countries">Countries: </label>
          <select name="countries" id="countries" onChange={handleInputChange}>
            <option>- Select countries -</option>
            {data.countries.length &&
              data.countries.map((country) => {
                return (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                );
              })}
          </select>
          {error.countries && <p className="danger">{error.countries}</p>}
        </div>
        <input
          type="submit"
          disabled={Object.entries(error).length ? true : false}
        />
      </form>
    </div>
  );
}
