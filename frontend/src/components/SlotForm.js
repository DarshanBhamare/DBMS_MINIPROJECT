import React, { useState } from 'react';

const SlotForm = ({ onAddSlot }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    vaccineType: '',
    date: '',
    time: '',
    center: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    // Basic validation
    if (!formData.name || !formData.age || !formData.gender || 
        !formData.vaccineType || !formData.date || !formData.time || !formData.center) {
      alert('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    if (formData.age < 1 || formData.age > 120) {
      alert('Age must be between 1 and 120');
      setIsSubmitting(false);
      return;
    }

    // Call parent component's onAddSlot function which handles POST /slots
    const result = await onAddSlot(formData);
    
    if (result.success) {
      // Clear the form on successful submission
      setFormData({
        name: '',
        age: '',
        gender: '',
        vaccineType: '',
        date: '',
        time: '',
        center: ''
      });
      
      // Show success message
      setSuccessMessage('✅ Slot booked successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div>
      {successMessage && (
        <div className="mb-4 bg-green-50 border border-green-200 rounded-md p-3 text-center text-green-800 font-medium">
          {successMessage}
        </div>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors"
          required
        />
      </div>

      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
          Age *
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter your age"
          min="1"
          max="120"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors"
          required
        />
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
          Gender *
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="vaccineType" className="block text-sm font-medium text-gray-700 mb-1">
          Vaccine Type *
        </label>
        <select
          id="vaccineType"
          name="vaccineType"
          value={formData.vaccineType}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors"
          required
        >
          <option value="">Select Vaccine</option>
          <option value="Covaxin">Covaxin</option>
          <option value="Covishield">Covishield</option>
          <option value="Sputnik V">Sputnik V</option>
          <option value="Moderna">Moderna</option>
          <option value="Pfizer">Pfizer</option>
          <option value="Johnson & Johnson">Johnson & Johnson</option>
          <option value="Sinovac">Sinovac</option>
          <option value="Sinopharm">Sinopharm</option>
        </select>
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
          Vaccination Date *
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors"
          required
        />
      </div>

      <div>
        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
          Time Slot *
        </label>
        <select
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors"
          required
        >
          <option value="">Select Time</option>
          <option value="09:00 AM">09:00 AM</option>
          <option value="09:30 AM">09:30 AM</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="10:30 AM">10:30 AM</option>
          <option value="11:00 AM">11:00 AM</option>
          <option value="11:30 AM">11:30 AM</option>
          <option value="12:00 PM">12:00 PM</option>
          <option value="12:30 PM">12:30 PM</option>
          <option value="01:00 PM">01:00 PM</option>
          <option value="01:30 PM">01:30 PM</option>
          <option value="02:00 PM">02:00 PM</option>
          <option value="02:30 PM">02:30 PM</option>
          <option value="03:00 PM">03:00 PM</option>
          <option value="03:30 PM">03:30 PM</option>
          <option value="04:00 PM">04:00 PM</option>
          <option value="04:30 PM">04:30 PM</option>
          <option value="05:00 PM">05:00 PM</option>
        </select>
      </div>

      <div>
        <label htmlFor="center" className="block text-sm font-medium text-gray-700 mb-1">
          Vaccination Center *
        </label>
        <input
          type="text"
          id="center"
          name="center"
          value={formData.center}
          onChange={handleChange}
          placeholder="Enter vaccination center name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors"
          required
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Booking...' : 'Book Slot'}
      </button>
      </form>
    </div>
  );
};

export default SlotForm;
