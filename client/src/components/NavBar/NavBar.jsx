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
import { IoMdMenu, IoMdClose } from "react-icons/io";

export default function NavBar({ data, setCurrentPage }) {
  const [navbar, setNavbar] = useState(false);
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
      <nav className="py-6 h-20 sm:px-20 fixed top-0 z-50 shadow flex flex-1 items-center justify-center lg:justify-evenly flex-row w-full border-b-2 border-b-solid bg-navBg">
        <div className="justify-center md:items-center flex w-full">
          <div className=" 2xl:hidden flex items-center lg:justify-between py-3 px-2 2xl:py-5 w-full">
            <button
              className="self-start p-2 rounded-md outline-none focus:border-gray-400 focus:border"
              onClick={() => setNavbar(!navbar)}
            >
              {navbar ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
            </button>
            <form
              onSubmit={handleSubmit}
              className="flex flex-row flex-nowrap w-full lg:w-1/2 self-end"
            >
              <input
                type="text"
                placeholder="Search by name..."
                value={name}
                onChange={handleChange}
                className="p-2 rounded-xl mx-2 border border-inset w-full overflow-hidden"
              />
              <Button type="submit">
                <span className="material-symbols-outlined text-white">
                  travel_explore
                </span>
              </Button>
            </form>
          </div>

          <div
            className={`w-full flex-1 justify-center items-center 2xl:items-start pb-3 2xl:flex 2xl:pb-0 2xl:mt-0 ${
              navbar
                ? "flex absolute top-0 right-0 h-auto -z-10 bg-navBg"
                : "hidden"
            }`}
          >
            <div className="flex-col items-center justify-center py-10 space-y-10 flex 2xl:space-x-6 2xl:flex-row 2xl:space-y-0">
              <form
                onSubmit={handleSubmit}
                className="hidden 2xl:flex flex-row flex-nowrap"
              >
                <input
                  type="text"
                  placeholder="Search countries by name..."
                  value={name}
                  onChange={handleChange}
                  className=" p-2 rounded-xl mx-2 border border-inset w-full overflow-hidden"
                />
                <Button type="submit">
                  <span className="material-symbols-outlined text-white">
                    travel_explore
                  </span>
                </Button>
              </form>

              <select
                name="filterByContinent"
                id="filterByContinent"
                value={filter}
                onChange={handleFilterByContinet}
                className="p-2 border-2 border-inset border-[#02335f4d] bg-optionBg rounded-full text-lg 2xl:ml-8 outline-none"
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
                className="p-2 border-2 border-inset border-[#02335f4d] bg-optionBg rounded-full text-lg  outline-none"
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
                className="p-2 border-2 border-inset border-[#02335f4d] bg-optionBg rounded-full text-lg  outline-none"
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

              {/*   <NavLink to="/create">
                <Button variant="secondary">
                  Click here to create activities!
                </Button>
              </NavLink> */}
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
