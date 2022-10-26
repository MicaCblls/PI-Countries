import React from "react";
import styles from "./Button.module.css";

// variant = primary | secondary
export default function Button({ variant, children, ...props }) {
  const variantStyle =
    variant === "primary" ? styles.primary : styles.secondary;
  return (
    <button className={variantStyle} {...props}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  variant: "primary",
};
