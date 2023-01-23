import express from 'express';

import {
  createHero,
  getHero,
  updateHero,
} from '../controllers/heroController.js';

const router = express.Router();

import authenticateUser from '../middleware/auth.js';

router.route('/').get(getHero).post(authenticateUser, createHero);

router.route('/:id').patch(authenticateUser, updateHero);

export default router;
