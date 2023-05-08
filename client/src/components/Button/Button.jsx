import React from "react";

// variant = primary | secondary
export default function Button({ variant, children, ...props }) {
  const variantStyle =
    variant === "primary" ? "bg-colorPrimary" : "bg-colorSecondary";
  return (
    <button
      className={`flex justify-center items-center py-1 px-6 md:py-2 rounded-full border border-solid border-neutral-400 text-lg transition-all ease-in-out ${variantStyle} hover:opacity-70 disabled:bg-disabledColor disabled:opacity-30`}
      {...props}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  variant: "primary",
};
