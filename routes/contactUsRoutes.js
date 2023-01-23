import express from 'express';

import {
  createContactMember,
  createContactUs,
  getAllContactMembers,
  getContactUs,
  updateContactUs,
} from '../controllers/contactUsController.js';

const router = express.Router();

import authenticateUser from '../middleware/auth.js';

router.route('/').get(getContactUs).post(authenticateUser, createContactUs);
router.route('/:id').patch(authenticateUser, updateContactUs);

router.route('/list').get(getAllContactMembers).post(createContactMember);

export default router;
