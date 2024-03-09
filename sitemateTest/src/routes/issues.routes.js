// src/routes/issues.js
import express from 'express';
import {
  getAll,
  getById,
  createIssue,
  updateIssue,
  deleteIssue,
} from '../controllers/issuesController.js';

const router = express.Router();

// Get all issues
router.get('/', getAll);

// Get a specific issue by ID
router.get('/:id', getById);

// Create a new issue
router.post('/', createIssue);

// Update an issue by ID
router.put('/:id', updateIssue);

// Delete an issue by ID
router.delete('/:id', deleteIssue);

export {router}
