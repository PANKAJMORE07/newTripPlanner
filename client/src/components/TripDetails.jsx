import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TripPlan from './TripPlan';
import ExpenseTracker from './ExpenseTracker';

const TripDetails = () => {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/trip/${id}`, {
          headers: {
            'Authorization': token
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch trip details');
        }

        const data = await response.json();
        setTrip(data.trip);
      } catch (error) {
        console.error('Error fetching trip details:', error);
        setError('Failed to load trip details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [id]);

  const handleDeleteTrip = async () => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/trip/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': token
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete trip');
        }

        navigate('/profile');
      } catch (error) {
        console.error('Error deleting trip:', error);
        setError('Failed to delete trip. Please try again later.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {trip && <TripPlan plan={trip} />}
      {trip && <ExpenseTracker tripId={trip._id} />}
      <button 
        onClick={handleDeleteTrip}
        style={{
          backgroundColor: '#dc3545',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          marginTop: '30px',
          cursor: 'pointer',
          marginLeft: '16.5rem'
        }}
      >
        Delete Trip plan
      </button>
    </>
  );
};

export default TripDetails;