import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContryById } from "../../store/actions";
import closeIcon from "../../x-cerrar.svg";
import Button from "../Button/Button";
import { NavLink } from "react-router-dom";

export default function CountryDetail({ handleClose, id }) {
  let dispatch = useDispatch();
  const data = useSelector((state) => state);
  let countryDetail = data.countryDetail;
  useEffect(() => {
    dispatch(getContryById(id));
  }, []);

  return (
    <React.Fragment>
      <div className="fixed z-[300] inset-0 font-Noah overflow-y-auto">
        <div className="flex items-center justify-center max-h-screen px-4 py-5 text-center sm:p-0 ">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>

          <span
            className="hidden xsm:inline-block xsm:align-middle xsm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div
            className="flex flex-col align-bottom rounded-lg text-left shadow-2xl transform transition-all my-4 h-1/2 sm:align-middle sm:max-w-2xl sm:w-full bg-white rounded-b-xl overflow-y-auto"
            style={{
              height: " clamp(20rem, 17.5207rem + 13.2231vw, 30rem)",
              fontSize: " clamp(1rem, 0.876rem + 0.6612vw, 1.5rem)",
            }}
          >
            <div className="bg-navBg px-2 py-2 rounded-t-lg flex flex-row-reverse justify-between items-start">
              <button
                className=" transition duration-150 ease-in-out bg-white rounded-full ml-4 my-2 h-6 md:h-fit"
                onClick={handleClose}
              >
                <img
                  src={closeIcon}
                  alt="Logo cerrar detalles"
                  className="w-8 h-fit md:w-10 md:h-10"
                />
              </button>
              <h2
                className="font-medium transition duration-150 ease-in-out px-4"
                style={{
                  fontSize: "clamp(1.3rem, 1.1512rem + 0.7934vw, 1.9rem)",
                  paddingTop: "clamp(0.5rem, 0.376rem + 0.6612vw, 1rem)",
                  paddingBottom: "clamp(0.5rem, 0.376rem + 0.6612vw, 1rem)",
                }}
              >
                {countryDetail.name}
              </h2>
            </div>
            <div className="bg-white h-fit flex justify-start items-center flex-col text-ellipsis  px-4 w-full md:p-6 md:h-fit rounded-b-xl overflow-visible contentScroll">
              <div className="flex flex-col md:flex-row justify-start items-center w-full h-fit">
                <div className="flex w-full h-auto self-start md:w-auto md:h-fit">
                  <img
                    src={countryDetail.flag}
                    alt={`Flag of ${countryDetail.name}`}
                    className="w-full h-24 md:h-auto object-contain aspect-auto"
                  />
                </div>
                <div className="flex flex-col self-center w-full md:self-end md:w-1/2 text-center pt-2">
                  <p>{countryDetail.id}</p>
                  <p>{countryDetail.continent}</p>
                  <p>{countryDetail.capital}</p>
                  <p>{countryDetail.subregion}</p>
                  <p>{countryDetail.area} km2</p>
                  <p>{countryDetail.population}</p>
                </div>
              </div>
              <div className="flex flex-col w-full justify-start items-start px-6 py-6">
                <h3 className="underline text-xl flex self-start md:text-2xl">
                  Tourist activity:
                </h3>
                <div className="flex flex-col md:flex-row flex-wrap gap-4 w-full">
                  {countryDetail.touristActivities?.length ? (
                    countryDetail.touristActivities.map((e) => {
                      return (
                        <table
                          key={e.id}
                          className="w-1/3 no-underline text-base flex flex-col justify-start items-start py-2"
                        >
                          <tbody>
                            <tr>
                              <td>Name:</td>
                              <td>{e.name.trim()}</td>
                            </tr>
                            <tr>
                              <td>Season: </td>
                              <td>{e.season}</td>
                            </tr>
                            <tr>
                              <td>Duration: </td>
                              <td>{e.duration} h</td>
                            </tr>
                            <tr>
                              <td>Difficulty: </td>
                              <td>{e.difficulty} points</td>
                            </tr>
                          </tbody>
                        </table>
                      );
                    })
                  ) : (
                    <>
                      <p className="flex self-center py-4">
                        There're no activities in this country yet...
                      </p>
                    </>
                  )}
                </div>
              </div>
              <NavLink to={"/create"}>
                {" "}
                <Button variant="secondary">Click here to create one!</Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
