import express from 'express';

import {
  createAbout,
  getAbout,
  updateAbout,
} from '../controllers/aboutController.js';

const router = express.Router();

import authenticateUser from '../middleware/auth.js';

router.route('/').get(getAbout).post(authenticateUser, createAbout);

router.route('/:id').patch(authenticateUser, updateAbout);

export default router;
