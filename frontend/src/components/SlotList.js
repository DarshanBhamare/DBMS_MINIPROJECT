import React, { useState } from 'react';

const SlotList = ({ slots, onDeleteSlot }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to cancel this vaccination slot?')) {
      setDeletingId(id);
      const result = await onDeleteSlot(id);
      setDeletingId(null);
      
      if (!result.success) {
        alert(result.error || 'Failed to delete slot');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (slots.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📅</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No slots booked yet</h3>
        <p className="text-gray-600">Book your first vaccination slot using the form above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {slots.map(slot => (
        <div key={slot._id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3 pb-2 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">{slot.name}</h3>
            <button
              className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={() => handleDelete(slot._id)}
              disabled={deletingId === slot._id}
              title="Cancel this vaccination slot"
            >
              {deletingId === slot._id ? '⏳ Cancelling...' : '❌ Cancel Slot'}
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500 font-medium">Age:</span>
              <span className="ml-2 text-gray-900">{slot.age} years</span>
            </div>
            
            <div>
              <span className="text-gray-500 font-medium">Gender:</span>
              <span className="ml-2 text-gray-900">{slot.gender}</span>
            </div>
            
            <div>
              <span className="text-gray-500 font-medium">Vaccine:</span>
              <span className="ml-2 inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                {slot.vaccineType}
              </span>
            </div>
            
            <div>
              <span className="text-gray-500 font-medium">Date:</span>
              <span className="ml-2 text-gray-900">{formatDate(slot.date)}</span>
            </div>
            
            <div>
              <span className="text-gray-500 font-medium">Time:</span>
              <span className="ml-2 inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                {slot.time}
              </span>
            </div>
            
            <div>
              <span className="text-gray-500 font-medium">Center:</span>
              <span className="ml-2 text-gray-900 font-medium">{slot.center}</span>
            </div>
          </div>
          
          <div className="mt-3 pt-2 border-t border-gray-100">
            <small className="text-gray-500">
              Booked on: {new Date(slot.createdAt).toLocaleDateString()}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlotList;
