import { FaPlane } from "react-icons/fa";

import { BsSunrise, BsSun, BsMoonStars } from "react-icons/bs";

const Itinerary = ({ itinerary }) => {
  const hasItinerary = Array.isArray(itinerary) && itinerary.length > 0;

  return (
    <div 
    style={{
      boxShadow:
        "rgba(0, 0, 0, 0.4) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
    }}
    className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <FaPlane className="text-blue-600 text-xl" />

        <h3 className="text-2xl font-semibold text-black-800">Itinerary</h3>
      </div>

      {hasItinerary ? (
        <div className="space-y-6">
          {itinerary.map((day, index) => (
            <div key={index} className="mb-6">
              {/* Day Title Aligned to Left */}

              <div className="flex items-center justify-start mb-4">
                <h4 className="font-semibold text-lg text-blue-600">
                  Day {index + 1}
                </h4>
              </div>

              <div className="space-y-4">
                {/* Morning Section */}

                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BsSunrise className="text-black-600" />

                    <span className="text-black-600">Morning</span>
                  </div>
                  <div className="flex items-center justify-start ">
                    <p className="text-black-600 " style={{fontSize: "17px"}}>{day.morning}</p>
                  </div>
                </div>

                {/* Afternoon Section */}

                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BsSun className="text-black-600" />

                    <span className="text-black-600">Afternoon</span>
                  </div>

                  <div className="flex items-center justify-start ">
                    <p className="text-black-600 " style={{fontSize: "17px"}}>{day.afternoon}</p>
                  </div>
                </div>

                {/* Evening Section */}

                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BsMoonStars className="text-black-600" />

                    <span className="text-black-600">Evening</span>
                  </div>

                  <div className="flex items-center justify-start ">
                    <p className="text-black-600 " style={{fontSize: "17px"}}>{day.evening}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-black-600">No itinerary available.</p>
      )}
    </div>
  );
};

export default Itinerary;
