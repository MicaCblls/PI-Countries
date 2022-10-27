import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities, getCountries } from "./store/actions";
import { Route } from "react-router-dom";
import styles from "./App.module.css";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import CountryDetail from "./components/CountryDetail/CountryDetail";
import CreateActivity from "./components/CreateActivity/CreateActivity";
import Pagination from "./components/Pagination/Pagination";
import Error from "./components/Error/Error";

function App() {
  let dispatch = useDispatch();
  const data = useSelector((state) => state);
  let [currentPage, setCurrentPage] = useState(1);
  let currentCountries;
  let totalPages = Math.ceil(data.countries.length / 10) + 1;
  //getting the data if the countries data is empty
  useEffect(() => {
    if (!data.countriesBackUp.length) {
      dispatch(getCountries());
    }
    if (!data.touristActivities.length) {
      dispatch(getActivities());
    }
  }, []);

  //setting current page
  if (currentPage === 1) {
    currentCountries = data.countries.slice(0, 9);
  } else {
    currentCountries = data.countries.slice(
      (currentPage - 1) * 10 - 1,
      (currentPage - 1) * 10 + 9
    );
  }

  //Change page
  const paginate = (number) => {
    setCurrentPage(currentPage + number);
  };
  return (
    <div className={styles.app}>
      <Route exact path={"/"} component={LandingPage} />
      <Route path={"/home"}>
        <NavBar data={data} setCurrentPage={setCurrentPage} />
        {data.error.length ? <Error error={data.error} /> : null}
        <Home data={currentCountries} />
        <Pagination
          totalPages={totalPages}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Route>
      <Route path={"/details/:id"}>
        <CountryDetail data={data} />
        {data.error.length ? <Error error={data.error} /> : null}
      </Route>
      <Route path={"/create"}>
        <CreateActivity data={data} />
        {data.error.length ? <Error error={data.error} /> : null}
      </Route>
    </div>
  );
}

export default App;
