import express from 'express';

import {
  createNewsLetterMember,
  createNewsLetter,
  getAllNewsLetterMembers,
  getNewsLetter,
  updateNewsLetter,
} from '../controllers/newsLetterController.js';

const router = express.Router();

import authenticateUser from '../middleware/auth.js';

router.route('/').get(getNewsLetter).post(authenticateUser, createNewsLetter);
router.route('/:id').patch(authenticateUser, updateNewsLetter);

router.route('/list').get(getAllNewsLetterMembers).post(createNewsLetterMember);

export default router;
