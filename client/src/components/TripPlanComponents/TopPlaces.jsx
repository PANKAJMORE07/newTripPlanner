import React from "react";
import { 
  FaMapMarkerAlt,    // Location marker
  FaClock,           // Time/Duration
  FaMoneyBillWave,   // Cost
  FaInfoCircle,      // Info
  FaLandmark,        // Historical/Landmark places
  FaUmbrellaBeach,   // Beach/Recreation
  FaMountain,        // Nature/Mountains
  FaBuilding,        // Palace/Museum
  FaTree,            // Parks/Gardens
  FaChurch,          // Religious places
  FaTicketAlt,       // Entry ticket
  FaStar,            // Rating
  FaStore,           // Shopping places
  FaUtensils,        // Restaurants/Food places
  FaUniversity,      // Historical buildings
  FaArchway          // Monuments
} from "react-icons/fa";

const getPlaceIcon = (placeName) => {
  const name = placeName.toLowerCase();
  
  if (name.includes('beach')) return <FaUmbrellaBeach className="mr-2 text-blue-400" />;
  if (name.includes('mountain') || name.includes('hill')) return <FaMountain className="mr-2 text-gray-600" />;
  if (name.includes('park') || name.includes('garden')) return <FaTree className="mr-2 text-green-500" />;
  if (name.includes('temple') || name.includes('church') || name.includes('shrine')) 
    return <FaChurch className="mr-2 text-purple-500" />;
  if (name.includes('palace') || name.includes('museum')) return <FaUniversity className="mr-2 text-amber-600" />;
  if (name.includes('market') || name.includes('shop')) return <FaStore className="mr-2 text-orange-500" />;
  if (name.includes('restaurant') || name.includes('cafe')) return <FaUtensils className="mr-2 text-red-400" />;
  if (name.includes('monument')) return <FaArchway className="mr-2 text-gray-500" />;
  if (name.includes('building')) return <FaBuilding className="mr-2 text-indigo-500" />;
  
  // Default icon for other places
  return <FaLandmark className="mr-2 text-blue-500" />;
};

const TopPlaces = ({ places }) => {
  return (
    <div
      style={{
        boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}
      className="bg-white rounded-lg shadow-sm p-4 lg:p-6"
    > 
      <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <FaMapMarkerAlt className="mr-2 text-red-500" />
        Top Places to Visit
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {places.map((place, index) => (
          <div key={index} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-4">
              <h4 className="text-lg font-semibold mb-2 flex items-center">
                {getPlaceIcon(place.name)}
                {place.name}
              </h4>
              <p className="text-gray-600 text-sm mb-2 leading-relaxed">
                {place.description}
              </p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-gray-500 text-sm flex items-center">
                  <FaMoneyBillWave className="mr-2 text-green-500" />
                  Estimated cost: {place.cost}
                </p>
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-600">Must Visit</span>
                </div>
              </div>
              {place.openingHours && (
                <p className="text-gray-500 text-sm flex items-center mt-2">
                  <FaClock className="mr-2 text-purple-500" />
                  {place.openingHours}
                </p>
              )}
              {place.entryFee && (
                <p className="text-gray-500 text-sm flex items-center mt-2">
                  <FaTicketAlt className="mr-2 text-orange-500" />
                  Entry: {place.entryFee}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPlaces;
