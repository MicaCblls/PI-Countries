import React from "react";
import "./Error.css";

export default function Error({ error }) {
  return (
    <div className="error-container">
      <p className="error-text">{error}</p>
    </div>
  );
}
