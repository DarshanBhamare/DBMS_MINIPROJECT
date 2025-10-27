const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [1, 'Age must be at least 1'],
    max: [120, 'Age cannot exceed 120']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: {
      values: ['Male', 'Female', 'Other'],
      message: 'Gender must be Male, Female, or Other'
    }
  },
  vaccineType: {
    type: String,
    required: [true, 'Vaccine type is required'],
    trim: true,
    maxlength: [50, 'Vaccine type cannot exceed 50 characters'],
    validate: {
      validator: function(value) {
        // Common vaccine types validation
        const validVaccines = ['Covaxin', 'Covishield', 'Sputnik V', 'Moderna', 'Pfizer', 'Johnson & Johnson', 'Sinovac', 'Sinopharm'];
        return validVaccines.includes(value) || value.length >= 3;
      },
      message: 'Please provide a valid vaccine type'
    }
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    validate: {
      validator: function(value) {
        // Ensure date is not in the past
        return value >= new Date().setHours(0, 0, 0, 0);
      },
      message: 'Date cannot be in the past'
    }
  },
  time: {
    type: String,
    required: [true, 'Time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/, 'Time must be in HH:MM AM/PM format']
  },
  center: {
    type: String,
    required: [true, 'Center name is required'],
    trim: true,
    maxlength: [100, 'Center name cannot exceed 100 characters']
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Index for efficient queries
slotSchema.index({ date: 1, time: 1, center: 1 }, { unique: true });

// Virtual for formatted date
slotSchema.virtual('formattedDate').get(function() {
  return this.date.toISOString().split('T')[0];
});

// Method to check if slot is available
slotSchema.statics.isSlotAvailable = async function(date, time, center, excludeId = null) {
  const query = { date: new Date(date), time, center };
  if (excludeId) {
    query._id = { $ne: excludeId };
  }
  const existingSlot = await this.findOne(query);
  return !existingSlot;
};

// Transform JSON output
slotSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Slot', slotSchema);
