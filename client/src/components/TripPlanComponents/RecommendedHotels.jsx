import React, { useState, useEffect } from "react";
import { GetPhotoReference } from "../Images/PhotosAPI";

const RecommendedHotels = ({ destination, hotels }) => {
  const [photoReferences, setPhotoReferences] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const references = await Promise.all(
          hotels.map((hotel) => GetPhotoReference(destination, hotel.name))
        );
        console.log("Photo references:", references);
        setPhotoReferences(references);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, [destination, hotels]);

  return (
    <div
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.4) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}
      className="bg-white rounded-lg shadow-2xl p-6"
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Recommended Hotels
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {hotels.map((hotel, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            {photoReferences[index] && (
              <img
                src={`https://maps.gomaps.pro/maps/api/place/photo?photo_reference=${photoReferences[index]}&maxwidth=400&key=AIzaSyCfbvKy-HBlex2UA8v2jG0MdxNB4mOc6P0`}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h4 className="font-semibold text-lg mb-2">{hotel.name}</h4>
              <p className="text-gray-600 mb-2">{hotel.description}</p>
              <p className="text-sm text-gray-500">
                Estimated price per night: {hotel.estimatedPrice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedHotels;
