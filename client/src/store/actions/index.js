import axios from "axios";

export const ERROR = "ERROR";
export const CLEAN_ERROR = "CLEAN_ERROR";
export const CLEAN_SUCCESS = "CLEAN_SUCCESS";
export const CLEANER = "CLEANER";
export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";
export const GET_COUNTRY_BY_ID = "GET_COUNTRY_BY_ID";
export const ORDER_COUNTRIES = "ORDER_COUNTRIES";
export const FILTER_COUNTRIES_BY_CONTINENT = "FILTER_COUNTRIES_BY_CONTINENT";
export const FILTER_COUNTRIES_BY_ACTIVITY = "FILTER_COUNTRIES_BY_ACTIVITY";
export const CREATE = "CREATE";

export const getCountries = () => {
  return function (dispatch) {
    axios.get("/countries").then(
      (res) => dispatch({ type: GET_ALL_COUNTRIES, payload: res.data }),
      (error) => dispatch({ type: ERROR, payload: error.response.data })
    );
  };
};
export const getActivities = () => {
  return function (dispatch) {
    axios.get("/activities").then(
      (res) => dispatch({ type: GET_ALL_ACTIVITIES, payload: res.data }),
      (error) => dispatch({ type: ERROR, payload: error.response.data })
    );
  };
};

export const getCountriesByName = (name) => {
  return function (dispatch) {
    axios.get(`/countries?name=${name}`).then(
      (res) => dispatch({ type: GET_COUNTRIES_BY_NAME, payload: res.data }),
      (error) => dispatch({ type: ERROR, payload: error.response.data })
    );
  };
};

export const getContryById = (id) => {
  return function (dispatch) {
    axios.get(`/countries/${id}`).then(
      (res) => {
        dispatch({ type: GET_COUNTRY_BY_ID, payload: res.data });
      },
      (error) => dispatch({ type: ERROR, payload: error.response.data })
    );
  };
};
export const getCountriesOrdered = (order) => {
  return { type: ORDER_COUNTRIES, payload: order };
};

export const createActivity = (values) => {
  return function (dispatch) {
    axios.post("/create", values).then(
      (res) => dispatch({ type: CREATE, payload: res.data }),
      (error) => dispatch({ type: ERROR, payload: error.response.data })
    );
  };
};

export const filterCountriesByContinent = (filter) => {
  return {
    type: FILTER_COUNTRIES_BY_CONTINENT,
    payload: filter,
  };
};
export const filterCountriesByActivity = (filter) => {
  return {
    type: FILTER_COUNTRIES_BY_ACTIVITY,
    payload: filter,
  };
};
export const cleaner = () => {
  return { type: CLEANER };
};

export const cleanError = () => {
  return { type: CLEAN_ERROR };
};
export const cleanSuccess = () => {
  return { type: CLEAN_SUCCESS };
};
