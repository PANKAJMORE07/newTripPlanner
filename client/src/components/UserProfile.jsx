import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTrips, setFilteredTrips] = useState([]);

  useEffect(() => {
    const fetchUserTrips = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/user-trips', {
          headers: {
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user trips');
        }

        const data = await response.json();

        const tripsWithImages = await Promise.all(
          data.trips.map(async (trip) => {
            const imageUrl = await fetchCityImage(trip.destination);
            return { ...trip, imageUrl };
          })
        );

        setTrips(tripsWithImages);
        setFilteredTrips(tripsWithImages);
      } catch (error) {
        console.error('Error fetching user trips:', error);
        setError('Failed to load trips. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserTrips();
  }, []);

  const fetchCityImage = async (city) => {
    const apiKey = 'XC64aypCuufPGswnmoNeYCwgIiEHeXJ17kSumaOJhaNVCFCHr6jVoN08';
    const url = `https://api.pexels.com/v1/search?query=${city}&per_page=1`;
    const response = await fetch(url, {
      headers: {
        Authorization: apiKey,
      },
    });
    const data = await response.json();
    return data.photos[0]?.src?.medium || '/path/to/default-image.jpg';
  };

  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = trips.filter((trip) =>
      trip.destination.toLowerCase().includes(term)
    );
    setFilteredTrips(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#4A90E2" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-bold text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Trips</h1>

      {/* Search Bar and Create New Trip Button */}
      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-grow">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search trips by destination..."
            className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <Link
          to="/dashboard" // Change this to your actual route for creating a new trip
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
        >
          Create New Trip
        </Link>
      </div>

      {filteredTrips.length === 0 ? (
        <p className="text-center text-gray-600">No trips found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <div
              key={trip._id}
              className="bg-white rounded-lg shadow-md p-4 transition-transform hover:scale-105 duration-300"
            >
              <img
                src={trip.imageUrl}
                alt={trip.destination}
                onError={(e) => (e.target.src = '/path/to/default-image.jpg')}
                className="w-full h-48 md:h-64 object-cover rounded-t-md"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{trip.destination}</h2>
                <p className="text-gray-600 mb-1">Duration: {trip.duration} days</p>
                <p className="text-gray-600 mb-4">Budget: ${trip.budget}</p>
                <Link
                  to={`/trip/${trip._id}`}
                  className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
