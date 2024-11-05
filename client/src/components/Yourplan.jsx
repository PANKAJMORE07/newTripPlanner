import { Link } from "react-scroll";
import { useLocation } from "react-router-dom";

const YourPlan = () => {
  const location = useLocation();

  return (
    <div className="h-screen overflow-y-auto bg-white p-4 rounded-lg shadow-lg ">
      <div className="ml-8">
        <h2 className="text-xl lg:text-2xl font-bold mb-4 mr-48">Your Plan</h2>
        <ul className="list-none space-y-3 mb-6">
          <li>
            <Link
              to="about-destination"
              smooth={true}
              duration={500}
              className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <span className="icon mr-3 text-xl">ⓘ</span>
              
              <span className="text-gray-700">About the Place</span>
            </Link>
          </li>
          <li>
            <Link
              to="top-places"
              smooth={true}
              duration={500}
              className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <span className="icon mr-3 text-xl">⚲</span>
              <span className="text-gray-700">Top Places to Visit</span>
            </Link>
          </li>
          <li>
            <Link
              to="recommended-hotels"
              smooth={true}
              duration={500}
              className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <span className="icon mr-3 text-xl">⌂</span>
              <span className="text-gray-700">Recommended Hotels</span>
            </Link>
          </li>
          <li>
            <Link
              to="itinerary"
              smooth={true}
              duration={500}
              className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <span className="icon mr-3 text-xl">↗</span>
              <span className="text-gray-700">Itinerary</span>
            </Link>
          </li>
          <li>
            <Link
              to="local-cuisine"
              smooth={true}
              duration={500}
              className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <span className="icon mr-3 text-xl">🍴</span>
              <span className="text-gray-700">Local Cuisines</span>
            </Link>
          </li>
          <li>
            <Link
              to="best-time"
              smooth={true}
              duration={500}
              className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <span className="icon mr-3 text-xl">⏱</span>
              <span className="text-gray-700">Best Time to Visit</span>
            </Link>
          </li>
          <li>
            <Link
              to="budget-breakdown"
              smooth={true}
              duration={500}
              className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <span className="icon mr-3 text-xl">🧾</span>
              <span className="text-gray-700">Budget Breakdown</span>
            </Link>
          </li>
        </ul>

        <ul className="list-none space-y-3">
          {location.pathname !== "/dashboard" && (
            <li>
              <Link
                to="expense-tracker"
                smooth={true}
                duration={500}
                className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <span className="icon mr-3 text-xl">💲</span>
                <span className="text-gray-700">Expense Tracker</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default YourPlan;
