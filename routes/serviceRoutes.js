import express from 'express';

import {
  createService,
  getService,
  updateService,
  createListItem,
  deleteListItem,
  getAllServiceList,
  updateListItem,
} from '../controllers/serviceController.js';

const router = express.Router();

import authenticateUser from '../middleware/auth.js';

router.route('/').get(getService).post(authenticateUser, createService);
router.route('/:id').patch(authenticateUser, updateService);

router
  .route('/list')
  .get(getAllServiceList)
  .post(authenticateUser, createListItem);
router
  .route('/list/:id')
  .patch(authenticateUser, updateListItem)
  .delete(authenticateUser, deleteListItem);

export default router;
