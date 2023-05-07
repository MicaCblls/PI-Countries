import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import CountryDetail from "../CountryDetail/CountryDetail";

export default function CountryCard({ name, continent, flag, id }) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  return (
    <React.Fragment>
      {open ? <CountryDetail handleClose={handleClose} id={id} /> : null}
      <div className="text-text bg-white p-4 flex flex-col items-center justify-start w-full  md:w-1/5  rounded-2xl border border-solid transition-all ease-in-out hover:shadow-2xl">
        <img
          src={flag}
          alt={`Flag of ${name}`}
          className="w-full h-1/2 2xl:w-1/2 md:h-[150px] self-auto aspect-auto object-cover"
        />
        <div className="m-2 w-full h-full 2xl:w-1/2 flex flex-col">
          <h2
            className="w-full text-ellipsis font-semibold py-2"
            style={{ fontSize: "clamp(1rem, 0.876rem + 0.6612vw, 1.5rem)" }}
          >
            {name}
          </h2>
          <p>{id}</p>
          <p>{continent}</p>
        </div>

        <Button variant="secondary" onClick={handleClickOpen}>
          Read more
        </Button>
      </div>
    </React.Fragment>
  );
}
