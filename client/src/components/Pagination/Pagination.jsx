import React from "react";
import "./Pagination.css";
export default function Pagination({
  totalPages,
  paginate,
  currentPage,
  setCurrentPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="container">
      <ul className="ul-container">
        {currentPage > 1 && (
          <li className={`li-container`}>
            <a href="#" onClick={() => paginate(-1)}>
              Prev
            </a>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number} className={`li-container`}>
            <a href="#" onClick={() => setCurrentPage(number)}>
              {number}
            </a>
          </li>
        ))}
        {currentPage !== pageNumbers.length && (
          <li className={`li-container`}>
            <a href="#" onClick={() => paginate(1)}>
              Next
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
