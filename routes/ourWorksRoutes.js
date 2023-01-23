import express from 'express';

import {
  createWorkItem,
  deleteWorkItem,
  getAllOurWorks,
  updateWorkItem,
} from '../controllers/ourWorkController.js';

const router = express.Router();

import authenticateUser from '../middleware/auth.js';

router.route('/').get(getAllOurWorks).post(authenticateUser, createWorkItem);

router
  .route('/:id')
  .patch(authenticateUser, updateWorkItem)
  .delete(authenticateUser, deleteWorkItem);

export default router;
