import React, { useEffect, useState } from "react";
import { GetPhotoReference } from "../Images/PhotosAPI";

const TopPlaces = ({ destination, places }) => {
  const [photoReferences, setPhotoReferences] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const references = await Promise.all(
          places.map((place) => GetPhotoReference(destination, place.name))
        );
        console.log("Photo references:", references);
        setPhotoReferences(references);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, [destination, places]);

  return (
    <div
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.4) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}
      className="bg-white rounded-lg shadow-sm p-4 lg:p-6"
    >
      <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4">
        Top Places to Visit
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {places.map((place, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            {photoReferences[index] && (
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={`https://maps.gomaps.pro/maps/api/place/photo?photo_reference=${photoReferences[index]}&maxwidth=400&key=AIzaSyCfbvKy-HBlex2UA8v2jG0MdxNB4mOc6P0`}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h4 className="text-lg font-semibold mb-2">{place.name}</h4>
              <p className="text-gray-600 text-sm mb-2">{place.description}</p>
              <p className="text-gray-500 text-sm">
                Estimated cost: {place.cost}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPlaces;
