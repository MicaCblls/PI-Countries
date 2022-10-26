import {
  CLEANER,
  CLEAN_ERROR,
  CLEAN_SUCCESS,
  CREATE,
  ERROR,
  GET_ALL_COUNTRIES,
  GET_ALL_ACTIVITIES,
  GET_COUNTRIES_BY_NAME,
  GET_COUNTRY_BY_ID,
  ORDER_COUNTRIES,
  FILTER_COUNTRIES_BY_CONTINENT,
  FILTER_COUNTRIES_BY_ACTIVITY,
} from "../actions";

const initialState = {
  countries: [],
  countriesBackUp: [],
  countryDetail: {},
  touristActivities: [],
  error: "",
  success: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: [...action.payload],
        countriesBackUp: [...action.payload],
      };
    case GET_ALL_ACTIVITIES:
      return {
        ...state,
        touristActivities: [...action.payload],
      };
    case GET_COUNTRIES_BY_NAME:
      return {
        ...state,
        countries: [...action.payload],
      };
    case GET_COUNTRY_BY_ID:
      return {
        ...state,
        countryDetail: { ...action.payload },
      };
    case ORDER_COUNTRIES:
      if (action.payload === "orderAtoZ") {
        let orderedAToZ = state.countries.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        });
        return { ...state, countries: orderedAToZ };
      } else if (action.payload === "orderZtoA") {
        let orderedZToA = state.countries.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        });
        return { ...state, countries: orderedZToA };
      } else if (action.payload === "ascending") {
        let ascendingOrder = state.countries.sort(
          (a, b) => b.population - a.population
        );
        return { ...state, countries: ascendingOrder };
      } else if (action.payload === "descending") {
        let descendingOrder = state.countries.sort(
          (a, b) => a.population - b.population
        );
        return { ...state, countries: descendingOrder };
      }
      return {
        ...state,
      };

    case CREATE:
      return {
        ...state,
        success: action.payload,
      };
    case FILTER_COUNTRIES_BY_CONTINENT:
      let countriesFilteredByContinent = state.countriesBackUp.filter(
        (country) => country.continent === action.payload
      );

      return {
        ...state,
        countries: countriesFilteredByContinent,
      };
    case FILTER_COUNTRIES_BY_ACTIVITY:
      let countriesFilteredByActivity = [];
      let activityMatch = state.touristActivities.filter(
        (e) => e.name === action.payload
      );

      for (const activity of activityMatch) {
        countriesFilteredByActivity = countriesFilteredByActivity.concat(
          activity.countries.flat()
        );
      }

      return {
        ...state,
        countries: countriesFilteredByActivity,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEANER:
      return {
        ...state,
        countries: [...state.countriesBackUp],
        countryDetail: {},
        error: "",
      };
    case CLEAN_ERROR:
      return { ...state, error: "" };
    case CLEAN_SUCCESS:
      return { ...state, success: "" };
    default:
      return { ...state };
  }
};

export default rootReducer;
