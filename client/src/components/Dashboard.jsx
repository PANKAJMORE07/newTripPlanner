import { useState } from "react";
import TripPlan from "./TripPlan";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    travelStyle: "",
    activities: [],
    destination: "",
    budget: 1000,
    duration: 7,
  });

  const navigate = useNavigate();

  const [tripPlan, setTripPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3)); // Change to 3
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:3000/api/generate-trip-plan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate trip plan");
      }

      const data = await response.json();
      console.log("Received trip plan:", data);
      setTripPlan(data);
      setStep(4); // Change to 4 to skip to trip plan display
    } catch (error) {
      console.error("Error generating trip plan:", error);
      setError("Failed to generate trip plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStoreTrip = async () => {
    setIsSaving(true);
    setSaveError(null);

    try {
      const tripData = {
        ...formData,
        ...tripPlan,
      };

      console.log("Sending trip data:", tripData);
      const response = await fetch("http://localhost:3000/api/store-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"), // Add the JWT token
        },
        body: JSON.stringify(tripData),
      });

      if (!response.ok) {
        throw new Error("Failed to store trip");
      }

      const data = await response.json();
      console.log("Trip stored successfully:", data);
      setTimeout(() => navigate("/profile"), 1000);
    } catch (error) {
      console.error("Error storing trip:", error);
      setSaveError("Failed to store trip. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Travel Preferences</h2>
            <p className="text-gray-600">
              Tell us about your ideal travel experience.
            </p>
            <div className="space-y-2">
              <label className="block font-medium">
                What's your preferred travel style?
              </label>
              <div className="space-y-2">
                {["Relaxed", "Adventure", "Cultural"].map((style) => (
                  <label key={style} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="travelStyle"
                      value={style.toLowerCase()}
                      checked={formData.travelStyle === style.toLowerCase()}
                      onChange={(e) =>
                        updateFormData("travelStyle", e.target.value)
                      }
                      className="form-radio"
                    />
                    <span>{style}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block font-medium">
                What activities interest you? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Sightseeing",
                  "Food & Dining",
                  "Nature",
                  "Shopping",
                  "Museums",
                  "Nightlife",
                ].map((activity) => (
                  <label key={activity} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.activities.includes(activity)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFormData("activities", [
                            ...formData.activities,
                            activity,
                          ]);
                        } else {
                          updateFormData(
                            "activities",
                            formData.activities.filter((a) => a !== activity)
                          );
                        }
                      }}
                      className="form-checkbox"
                    />
                    <span>{activity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Destination</h2>
            <p className="text-gray-600">Where would you like to travel?</p>
            <div className="space-y-2">
              <label htmlFor="destination" className="block font-medium">
                City name
              </label>
              <input
                id="destination"
                type="text"
                value={formData.destination}
                onChange={(e) => updateFormData("destination", e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="e.g. Paris, Tokyo, New York"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Budget and Duration</h2>
            <p className="text-gray-600">
              Help us plan within your budget and timeframe.
            </p>
            <div className="space-y-2">
              <label className="block font-medium">
                Budget (in USD): ${formData.budget}
              </label>
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={formData.budget}
                onChange={(e) =>
                  updateFormData("budget", parseInt(e.target.value))
                }
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="block font-medium">
                Trip duration: {formData.duration} days
              </label>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={formData.duration}
                onChange={(e) =>
                  updateFormData("duration", parseInt(e.target.value))
                }
                className="w-full"
              />
            </div>
          </div>
        );
      // Remove case 4
    }
  };

  const handleStartOver = () => {
    // Reset the step to 1 and clear form data, trip plan, etc.
    setStep(1);
    setFormData({
      travelStyle: "",
      activities: [],
      destination: "",
      budget: 1000,
      duration: 7,
    });
    setTripPlan(null);
    setError(null);
  };

  return (
    <div
      className={`min-h-screen ${
        step < 4 ? "bg-[url('/travel-background.jpg')] bg-cover bg-center" : ""
      } flex flex-col items-center justify-center p-4`}
    >
      {step < 4 ? (
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg p-6 max-w-md w-full">
          <div className="relative h-2 bg-gray-200 mb-6">
            <div
              className="absolute h-2 bg-blue-500 transition-all duration-300 ease-in-out"
              style={{ width: `${(step / 4) * 100}%` }} // Adjust for 4 steps
            ></div>
          </div>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p>Generating your trip plan...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={handleStartOver} // Use the new handleStartOver function
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Start Over
              </button>
            </div>
          ) : (
            renderStep()
          )}

          {!isLoading && !error && (
            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
              >
                Back
              </button>
              <button
                onClick={step === 3 ? handleSubmit : handleNext}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {step === 3 ? "Generate Plan" : "Next"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white ">
          <TripPlan plan={tripPlan} />
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleStoreTrip}
              disabled={isSaving}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 mr-8"
            >
              {isSaving ? "Saving..." : "Save Trip"}
            </button>
          </div>
          {saveError && <p className="text-red-500 mt-2">{saveError}</p>}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
