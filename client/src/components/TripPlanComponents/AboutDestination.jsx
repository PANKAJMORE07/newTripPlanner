import { useEffect, useState } from "react";
import { GetPhotoReference } from "../Images/PhotosAPI";

const AboutDestination = ({ destination, about }) => {
  const [photoReference, setPhotoReference] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const photoReference = await GetPhotoReference(
          destination,
          destination
        );
        console.log(photoReference);
        setPhotoReference(photoReference);
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

    fetchPhoto();
  }, [destination]);

  return (
    <>
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
        <img
          src={`https://maps.gomaps.pro/maps/api/place/photo?photo_reference=${photoReference}&maxwidth=400&key=AIzaSyCfbvKy-HBlex2UA8v2jG0MdxNB4mOc6P0`}
          alt={destination}
          className="w-full h-48 md:h-80 object-cover"
        />
      </div>
      <div
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.4) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
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



