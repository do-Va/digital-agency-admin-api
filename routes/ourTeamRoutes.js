import express from 'express';

import {
  createTeamMember,
  deleteTeamMember,
  getAllOurTeams,
  updateTeamMember,
} from '../controllers/ourTeamController.js';

const router = express.Router();

import authenticateUser from '../middleware/auth.js';

router.route('/').get(getAllOurTeams).post(authenticateUser, createTeamMember);

router
  .route('/:id')
  .patch(authenticateUser, updateTeamMember)
  .delete(authenticateUser, deleteTeamMember);

export default router;
