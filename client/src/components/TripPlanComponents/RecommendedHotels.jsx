import React from "react";
import { FaBed, FaDollarSign, FaMapMarkerAlt, FaStar } from "react-icons/fa";

const RecommendedHotels = ({ hotels }) => {
  return (
    <div className="bg-white rounded-lg shadow-2xl p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <FaBed className="mr-2 text-blue-500" />
        Recommended Hotels
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {hotels.map((hotel, index) => (
          <div key={index} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-4">
              <h4 className="font-semibold text-lg mb-2 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                {hotel.name}
              </h4>
              <p className="text-gray-600 mb-2 leading-relaxed">
                {hotel.description}
              </p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-sm text-gray-500 flex items-center">
                  <FaDollarSign className="mr-1 text-green-500" />
                  Estimated price per night: {hotel.estimatedPrice}
                </p>
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-600">Highly Rated</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedHotels;
