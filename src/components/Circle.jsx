import React from "react";

const Circle = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="800"
    height="800"
    fill="none"
    viewBox="800 1000"
    style={{ border: "none" }}
  >
    <circle {...props}></circle>
    <text x="500" y="500" fontFamily="sans-serif" fontSize="14px" fill="black"></text>
  </svg>
);

export default Circle;