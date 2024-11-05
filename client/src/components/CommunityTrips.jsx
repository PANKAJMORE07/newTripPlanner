const trips = [
    {
      name: "Singapore",
      imageUrl:
        "https://images.hdqwalls.com/wallpapers/singapore-skyscrapers-marina-bay-sands-evening-4k-es.jpg",
    },
    {
      name: "London",
      imageUrl:
        "https://www.goldentours.com/travelblog/wp-content/uploads/2015/07/shutterstock_555823393-scaled.jpg",
    },
    {
      name: "Mumbai",
      imageUrl:
        "http://www.tourplan2india.com/wp-content/uploads/2013/01/mumbai-gateway-of-India.jpg",
    },
    {
      name: "NewYork",
      imageUrl:
        "https://wpcluster.dctdigital.com/sundaypost/wp-content/uploads/sites/13/2016/09/28582727.jpg",
    },
    {
      name: "Goa",
      imageUrl:
        "https://1.bp.blogspot.com/-nxIHsF8lbzc/Xt9G8iZraWI/AAAAAAAABSQ/pMGiMhNSWY0ARD-d14Zkw6q73k120MNMACNcBGAsYHQ/s1600/goa.jpg",
    },
    {
      name: "Dubai",
      imageUrl:
        "https://www.traveloffpath.com/wp-content/uploads/2022/11/Skyline-Of-Dubai-United-Arab-Emirates-With-The-Tallest-Building-In-The-World-Burj-Khalifa-Reflecting-The-Sun-Shine-And-A-Sea-Of-Skyscrapers-Surrounding-It-Middle-East.jpg",
    },
    {
      name: "Maxico",
      imageUrl:
        "https://www.fodors.com/wp-content/uploads/2021/05/UltimateMexicoCity__HERO_shutterstock_1058054480.jpg",
    },
    {
      name: "Amsterdam",
      imageUrl:
        "https://wallup.net/wp-content/uploads/2019/09/176476-amsterdam-netherlands-holland-city-night-bridge-canal-lights-exposure-light-lighting-lights-river-boats-trees.jpg",
    },
  ];
  
  const FavoriteTrips = () => {
    return (
      <section 
      id="community-plans"
      className="py-16 px-8 ml-16 mr-16"
      >
        <h2 className="text-center text-2xl font-bold mb-16">
          Our Community's Favorite Trips
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trips.map((trip) => (
            <div
              key={trip.name}
              className="relative w-full h-56 w-35 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={trip.imageUrl}
                alt={trip.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-white text-lg font-semibold" style={{marginRight: "9rem"}}>{trip.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default FavoriteTrips;
  