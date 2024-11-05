const Trip = require("../Models/Trip");

const deleteTripById = async (req, res) => {
  try {
    const tripId = req.params.id;
    const deletedTrip = await Trip.findByIdAndDelete(tripId);

    if (!deletedTrip) {
      return res.status(404).json({
        message: "Trip not found",
        success: false
      });
    }

    res.status(200).json({
      message: "Trip deleted successfully",
      success: true
    });
  } catch (error) {
    console.error("Error deleting trip:", error);
    res.status(500).json({
      error: "Failed to delete trip",
      details: error.message,
      success: false
    });
  }
};

module.exports = deleteTripById;
