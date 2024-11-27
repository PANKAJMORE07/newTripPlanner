import { useEffect, useState } from "react";

const AboutDestination = ({ destination = "New York", about }) => {
  const [destinationPhoto, setDestinationPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        setIsLoading(true);
        
        // Simple query construction
       
        const url = `https://www.googleapis.com/customsearch/v1?q=${destination}&searchType=image&key=AIzaSyCWMkLvwU3JE5DB0jUvgPZfPb5AZ2fHQ70&cx=07a67d3c8cfba40be`;

        const response = await fetch(url);
        const data = await response.json();

        // Extract the first image URL from the response
        if (data.items && data.items.length > 0) {
          console.log('Setting photo URL:', data.items[0].link);
          setDestinationPhoto(data.items[0].link);
        }
      } catch (error) {
        console.error('Error fetching photo:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPhoto();
  }, [destination]);

  return (
    <>
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
        {isLoading ? (
          <div className="w-full h-48 md:h-80 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Loading photo...</span>
          </div>
        ) : destinationPhoto ? (
          <img
            src={destinationPhoto}
            alt={destination}
            className="w-full h-48 md:h-80 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.parentElement.innerHTML = 
                '<div class="w-full h-48 md:h-80 bg-gray-200 flex items-center justify-center">' +
                '<span class="text-gray-400">Image not available</span></div>';
            }}
          />
        ) : (
          <div className="w-full h-48 md:h-80 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No photo available</span>
          </div>
        )}
      </div>
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        }}
        className="p-6 rounded-lg mt-10"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          About {destination}
        </h3>
        <p className="text-gray-600">{about}</p>
      </div>
    </>
  );
};

export default AboutDestination;



