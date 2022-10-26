import {
  CLEANER,
  CLEAN_ERROR,
  CREATE,
  ERROR,
  GET_ALL_COUNTRIES,
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
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      let countriesWithActivities = action.payload.filter(
        (country) => country.touristActivities?.length
      );

      let activities = countriesWithActivities.reduce(
        (acc, current) => [...acc, ...current.touristActivities],
        []
      );
      return {
        ...state,
        countries: [...action.payload],
        countriesBackUp: [...action.payload],
        touristActivities: [...activities],
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
        touristActivity: [...state.touristActivities, action.payload],
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
      for (let i = 0; i < state.touristActivities.length; i++) {
        if (state.touristActivities[i].name === action.payload) {
          for (let j = 0; j < state.countriesBackUp.length; j++) {
            if (
              state.countriesBackUp[j].id ===
              state.touristActivities[i].CountryActivities.countryId
            ) {
              countriesFilteredByActivity.push(state.countriesBackUp[j]);
            }
          }
        }
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
    default:
      return { ...state };
  }
};

export default rootReducer;
