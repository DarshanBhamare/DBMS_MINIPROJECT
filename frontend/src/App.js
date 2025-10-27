import React, { useState, useEffect } from 'react';
import { api } from './api';
import SlotForm from './components/SlotForm';
import SlotList from './components/SlotList';

function App() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all slots on component mount
  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/slots');
      setSlots(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch slots');
      console.error('Error fetching slots:', err);
    } finally {
      setLoading(false);
    }
  };

  const addSlot = async (slotData) => {
    try {
      setError(null);
      const response = await api.post('/slots', slotData);
      setSlots([...slots, response.data.data]);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to book slot';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const deleteSlot = async (id) => {
    try {
      setError(null);
      await api.delete(`/slots/${id}`);
      setSlots(slots.filter(slot => slot._id !== id));
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete slot';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🏥 COVID-19 Vaccination Slot Booking
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Book your vaccination slot easily and safely
          </p>
          <button 
            className="inline-flex items-center px-4 py-2 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            onClick={fetchSlots}
            disabled={loading}
            title="Refresh slots list"
          >
            {loading ? '⏳' : '🔄'} Refresh
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex justify-between items-center">
              <span className="text-red-800">⚠️ {error}</span>
              <button 
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-600"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              📝 Book New Slot
            </h2>
            <SlotForm onAddSlot={addSlot} />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              📋 Booked Slots ({slots.length})
            </h2>
            {loading ? (
              <div className="text-center py-8 text-gray-500">
                Loading slots...
              </div>
            ) : (
              <SlotList slots={slots} onDeleteSlot={deleteSlot} />
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-gray-500">
            &copy; 2024 COVID-19 Vaccination Booking System
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
