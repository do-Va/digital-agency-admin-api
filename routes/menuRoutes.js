import express from 'express';

import {
  createMenu,
  deleteMenu,
  getAllMenus,
  updateMenu,
} from '../controllers/menuController.js';

const router = express.Router();

import authenticateUser from '../middleware/auth.js';

router.route('/').get(getAllMenus).post(authenticateUser, createMenu);

router
  .route('/:id')
  .patch(authenticateUser, updateMenu)
  .delete(authenticateUser, deleteMenu);

export default router;
