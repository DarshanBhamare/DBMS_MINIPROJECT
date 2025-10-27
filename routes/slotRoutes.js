const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Slot = require('../models/Slot');

// Validation middleware
const validateSlot = [
  body('name').notEmpty().withMessage('Name is required'),
  body('age').isInt({ min: 1, max: 120 }).withMessage('Age must be between 1 and 120'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
  body('vaccineType').notEmpty().withMessage('Vaccine type is required'),
  body('date').isISO8601().withMessage('Date must be a valid ISO date'),
  body('time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/).withMessage('Time must be in HH:MM AM/PM format'),
  body('center').notEmpty().withMessage('Center name is required')
];

// GET / → return all slots
router.get('/', async (req, res) => {
  try {
    const slots = await Slot.find().sort({ date: 1, time: 1 });
    res.json({
      success: true,
      count: slots.length,
      data: slots
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching slots',
      error: error.message
    });
  }
});

// POST / → add a slot
router.post('/', validateSlot, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { name, age, gender, vaccineType, date, time, center } = req.body;

    // Check if slot already exists for the same time and center
    const existingSlot = await Slot.findOne({ 
      date: new Date(date), 
      time, 
      center 
    });

    if (existingSlot) {
      return res.status(400).json({
        success: false,
        message: 'Slot already booked for this time and center'
      });
    }

    const newSlot = new Slot({
      name,
      age,
      gender,
      vaccineType,
      date: new Date(date),
      time,
      center
    });

    const savedSlot = await newSlot.save();
    
    res.status(201).json({
      success: true,
      message: 'Slot booked successfully',
      data: savedSlot
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error booking slot',
      error: error.message
    });
  }
});

// PUT /:id → update slot by id
router.put('/:id', validateSlot, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { name, age, gender, vaccineType, date, time, center } = req.body;
    const slotId = req.params.id;

    // Check if slot exists
    const existingSlot = await Slot.findById(slotId);
    if (!existingSlot) {
      return res.status(404).json({
        success: false,
        message: 'Slot not found'
      });
    }

    // Check if the new time slot is available (excluding current slot)
    const conflictingSlot = await Slot.findOne({ 
      _id: { $ne: slotId },
      date: new Date(date), 
      time, 
      center 
    });

    if (conflictingSlot) {
      return res.status(400).json({
        success: false,
        message: 'Slot already booked for this time and center'
      });
    }

    // Update the slot
    const updatedSlot = await Slot.findByIdAndUpdate(
      slotId,
      {
        name,
        age,
        gender,
        vaccineType,
        date: new Date(date),
        time,
        center
      },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Slot updated successfully',
      data: updatedSlot
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating slot',
      error: error.message
    });
  }
});

// DELETE /:id → delete slot by id
router.delete('/:id', async (req, res) => {
  try {
    const slotId = req.params.id;

    const deletedSlot = await Slot.findByIdAndDelete(slotId);
    
    if (!deletedSlot) {
      return res.status(404).json({
        success: false,
        message: 'Slot not found'
      });
    }

    res.json({
      success: true,
      message: 'Slot cancelled successfully',
      data: deletedSlot
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error cancelling slot',
      error: error.message
    });
  }
});

module.exports = router;
