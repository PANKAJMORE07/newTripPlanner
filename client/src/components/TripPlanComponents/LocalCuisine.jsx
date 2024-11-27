import React from "react";
import { FaUtensils, FaMoneyBillWave } from "react-icons/fa";

const LocalCuisine = ({ localCuisine }) => {
  return (
    <div
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.4) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <FaUtensils className="mr-2 text-red-500" />
        Local Cuisine
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {localCuisine.map((dish, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <div className="p-4">
              <h4 className="font-semibold text-lg mb-2">{dish.name}</h4>
              <p className="text-gray-600 mb-2">{dish.description}</p>
              <p className="text-sm text-gray-500 flex items-center">
                <FaMoneyBillWave className="mr-1 text-green-500" />
                Estimated cost: {dish.estimatedCost}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalCuisine;
