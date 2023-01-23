import Menu from '../models/Menu.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

/**
 * @desc Create Menu
 * @route POST /api/menus/
 * @access Private/Admin
 */
const createMenu = async (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    throw new BadRequestError('Please provide all values');
  }

  const menu = await Menu.create(req.body);

  res.status(StatusCodes.CREATED).json({ menu });
};

/**
 * @desc Get All Menus
 * @route GET /api/menus/
 * @access Private/Admin
 */
const getAllMenus = async (req, res) => {
  const menus = await Menu.find();

  res.status(StatusCodes.OK).json(menus);
};

/**
 * @desc Update Menu
 * @route PATCH /api/menus/:id
 * @access Private/Admin
 */
const updateMenu = async (req, res) => {
  const { id: menuId } = req.params;
  const { title, url } = req.body;

  if (!title || !url) {
    throw new BadRequestError('Please provide all values');
  }

  const menu = await Menu.findOne({ _id: menuId });

  if (!menu) {
    throw new NotFoundError(`No menu with id :${menuId}`);
  }

  const updatedMenu = await Menu.findOneAndUpdate({ _id: menuId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedMenu });
};

/**
 * @desc Delete Menu
 * @route DELETE /api/menus/:id
 * @access Private/Admin
 */
const deleteMenu = async (req, res) => {
  const { id: menuId } = req.params;
  const menu = await Menu.findOne({ _id: menuId });

  if (!menu) {
    throw new NotFoundError(`No menu with id :${menuId}`);
  }

  await menu.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! Menu removed' });
};

export { createMenu, getAllMenus, updateMenu, deleteMenu };
