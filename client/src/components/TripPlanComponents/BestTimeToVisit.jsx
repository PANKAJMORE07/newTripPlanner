import React from "react";

const BestTimeToVisit = ({ bestTimeToVisit }) => (
  <div
    style={{
      boxShadow:
        "rgba(0, 0, 0, 0.4) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
    }}
    className="bg-white rounded-lg shadow-md p-6"
  >
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">
      Best Time to Visit
    </h3>
    <p className="text-gray-600">{bestTimeToVisit}</p>
  </div>
);

export default BestTimeToVisit;
