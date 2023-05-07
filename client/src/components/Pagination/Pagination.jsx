import React from "react";
import styles from "./Pagination.module.css";
export default function Pagination({
  totalPages,
  paginate,
  currentPage,
  setCurrentPage,
}) {
  const maxNumbers = 3;
  let pages = [];
  //Filling array with pages numbers
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  //getting only 10 pages
  let pageNumbers = () => {
    const half = Math.round(maxNumbers / 2);
    let to = maxNumbers;
    if (currentPage + half >= totalPages) {
      to = totalPages;
    } else if (currentPage > half) {
      to = currentPage + half;
    }
    let from = to - maxNumbers;
    if (from < 0) {
      from = 0;
    }
    return pages.slice(from, to);
  };

  return (
    <div className={styles.containerPagination}>
      {currentPage > 1 && (
        <a href="#" onClick={() => paginate(-1)}>
          <li className={styles.previous}>Prev</li>
        </a>
      )}
      {pageNumbers().map((number) => (
        <a key={number} href="#" onClick={() => setCurrentPage(number)}>
          <li
            className={
              number === currentPage ? styles.active : styles.liContainer
            }
          >
            {number}
          </li>
        </a>
      ))}
      {currentPage !== totalPages && (
        <a href="#" onClick={() => paginate(1)}>
          <li className={styles.next}>Next</li>
        </a>
      )}
    </div>
  );
}
