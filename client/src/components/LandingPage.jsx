import { Link as LinkScroll } from "react-scroll";
import { MapPin, Compass, Calendar, ArrowRight, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import HowItWorks from "./Howitswork";
import Communitytrips from "./CommunityTrips";
import Feedback from "./Feedback";

export default function LandingPage() {
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedInUser(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setLoggedInUser(false);
    navigate("/", { replace: true });
    window.location.reload();
  };

  const handleFeedbackClick = () => {
    setShowFeedback(true);
  };

  const handleFeedbackClose = () => {
    setShowFeedback(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link className="flex items-center" to="/">
          <Compass className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">AI Travel Planner</span>
        </Link>
        <nav className="flex items-center space-x-12">
          {loggedInUser && (
            <Link
              className="text-black hover:text-blue-500 font-medium "
              to="/profile"
            >
              Dashboard
            </Link>
          )}
          <LinkScroll
            to="home"
            smooth={true}
            duration={500}
            className="text-black hover:text-blue-500 font-medium cursor-pointer"
          >
            Home
          </LinkScroll>
          <LinkScroll
            to="how-it-works"
            smooth={true}
            duration={500}
            className="text-black hover:text-blue-500 font-medium cursor-pointer"
          >
            How It Works
          </LinkScroll>
          <LinkScroll
            to="community-plans"
            smooth={true}
            duration={500}
            className="text-black hover:text-blue-500 font-medium cursor-pointer"
          >
            Community Trips
          </LinkScroll>
        </nav>
        <div className="flex items-center gap-3">
          {loggedInUser ? (
            <>
              <button
                onClick={handleFeedbackClick}
                className="flex items-center gap-2 text-black py-2 px-4 rounded-lg border-2 border-blue-500"
              >
                <MessageSquare className="h-4 w-4" />
                Feedback
              </button>
              <button
                onClick={handleLogout}
                className="text-black py-2 px-4 rounded-lg border-2 border-blue-500"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-black py-2 px-4 rounded-lg border-2 border-blue-500"
            >
              Sign In
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1">
        <div
          id="home"
          className="min-h-screen flex items-center justify-center"
        >
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-black text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Plan Your Dream Trip with AI
                  </h1>
                  <p className="text-black mx-auto max-w-[700px] text-gray-500 md:text-xl">
                    Let our AI create personalized travel itineraries tailored
                    to your preferences. Discover new places, save time, and
                    make unforgettable memories.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <div className="flex justify-center">
                    <Link
                      to="/dashboard"
                      className=" text-black text-lg py-2 px-5 rounded-xl border-2 border-blue-600  transition-colors duration-300"
                    >
                      Create a new trip
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className="w-full py-12 md:py-24 lg:py-32  ">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Why Choose AI Travel Planner ?
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 ">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg mt-32">
                <MapPin className="h-10 w-10 text-blue-500" />
                <h3 className="text-xl font-bold">Personalized Itineraries</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Tailored travel plans based on your preferences,
                  <br /> budget, and travel style.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg mt-32">
                <Compass className="h-10 w-10 text-blue-500" />
                <h3 className="text-xl font-bold">Local Insights</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Discover hidden gems and local favorites with <br />{" "}
                  AI-powered recommendations.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg mt-32">
                <Calendar className="h-10 w-10 text-blue-500" />
                <h3 className="text-xl font-bold">Smart Scheduling</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Optimize your time with intelligent scheduling and <br />{" "}
                  real-time updates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* how its works */}
        <HowItWorks />

        {/* community trips */}
        <Communitytrips />

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Plan Your Dream Trip?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join thousands of happy travelers and start your AI-powered
                  journey today.
                </p>
              </div>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 AI Travel Planner. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacy
          </Link>
        </nav>
      </footer>

      {showFeedback && (
        <Feedback isOpen={showFeedback} onClose={handleFeedbackClose} />
      )}
    </div>
  );
}
