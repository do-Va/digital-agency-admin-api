import express from 'express';

import {
  createTestimonialMember,
  deleteTestimonialMember,
  getAllTestimonials,
  updateTestimonialMember,
} from '../controllers/testimonialController.js';

const router = express.Router();

import authenticateUser from '../middleware/auth.js';

router
  .route('/')
  .get(getAllTestimonials)
  .post(authenticateUser, createTestimonialMember);

router
  .route('/:id')
  .patch(authenticateUser, updateTestimonialMember)
  .delete(authenticateUser, deleteTestimonialMember);

export default router;
