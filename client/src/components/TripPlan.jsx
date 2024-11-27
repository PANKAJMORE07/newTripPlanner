import YourPlan from './Yourplan'; // Import YourPlan component
import AboutDestination from './TripPlanComponents/AboutDestination';
import TopPlaces from './TripPlanComponents/TopPlaces';
import RecommendedHotels from './TripPlanComponents/RecommendedHotels';
import Itinerary from './TripPlanComponents/Itinerary';
import BestTimeToVisit from './TripPlanComponents/BestTimeToVisit';
import LocalCuisine from './TripPlanComponents/LocalCuisine';
import BudgetBreakdown from './TripPlanComponents/BudgetBreakdown';

const TripPlan = ({ plan }) => {
  if (!plan) return null;
  console.log(plan);
  return (
    <div className="min-h-screen flex">
      {/* Sidebar for YourPlan component */}
      <aside className="w-96 fixed top-0 left-0 h-screen bg-white shadow-md">
        <YourPlan  />
      </aside>

      {/* Main content area */}
      <main className="flex-1 max-w-7xl mx-auto px-8 ml-64">
        <div className="py-8">
         <div>
         <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-14 text-center">
          {plan.destination ? `Your Trip Plan to ${plan.destination}` : "Your Trip Plan"}
           
          </h2>
         </div>
          
          <div className="flex flex-col gap-8">
            <div id="about-destination">
              <AboutDestination destination={plan.destination} about={plan.about} />
            </div>
            <div id="top-places">
              <TopPlaces destination={plan.destination} places={plan.topPlaces} />
            </div>
            <div id="recommended-hotels">
              <RecommendedHotels destination={plan.destination} hotels={plan.hotels} />
            </div>
            <div id="itinerary">
              <Itinerary itinerary={plan.itinerary} />
            </div>
            <div id="best-time">
              <BestTimeToVisit bestTimeToVisit={plan.bestTimeToVisit} />
            </div>
            <div id="local-cuisine">
              <LocalCuisine localCuisine={plan.localCuisine} />
            </div>
            <div id="budget-breakdown">
              <BudgetBreakdown budgetBreakdown={plan.budgetBreakdown} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TripPlan;
