const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Task = require('./models/Task');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Route
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running'
  });
});

//used to validate an object 
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID'
    });
  }
  next();
};

// Get all tasks 
app.get('/api/v1/tasks', async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
});

// Get single task
app.get('/api/v1/tasks/:id', validateObjectId, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
});

// Create task
app.post('/api/v1/tasks', async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        error: 'Title is required'
      });
    }

    const task = await Task.create({
      title,
      description: description || '',
      completed: completed || false
    });

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors).map(e => e.message)
      });
    }
    next(error);
  }
});

// Update task
app.put('/api/v1/tasks/:id', validateObjectId, async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
});

// Delete task
app.delete('/api/v1/tasks/:id', validateObjectId, async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.message);
  const isProduction = process.env.NODE_ENV === 'production';

  res.status(err.statusCode || 500).json({
    success: false,
    error: isProduction ? 'Internal Server Error' : err.message
  });
});

module.exports = app;