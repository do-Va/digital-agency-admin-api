import Service from '../models/Service.js';
import ServiceList from '../models/ServiceList.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

/**
 * @desc Create Service
 * @route POST /api/service/
 * @access Private/Admin
 */
const createService = async (req, res) => {
  const { title, title2, description, buttonContent, image } = req.body;

  if (!title || !title2 || !description || !buttonContent || !image) {
    throw new BadRequestError('Please provide all values');
  }

  const service = await Service.create(req.body);

  res.status(StatusCodes.CREATED).json({ service });
};

/**
 * @desc Get Service
 * @route GET /api/service/:id
 * @access Private/Admin
 */
const getService = async (req, res) => {
  const service = await Service.find();

  res.status(StatusCodes.OK).json(service);
};

/**
 * @desc Update Service
 * @route PATCH /api/service/:id
 * @access Private/Admin
 */
const updateService = async (req, res) => {
  const { id: serviceId } = req.params;
  const { title, description, buttonContent, image } = req.body;

  if (!title || !description || !buttonContent || !image) {
    throw new BadRequestError('Please provide all values');
  }

  const service = await Service.findOne({ _id: serviceId });

  if (!service) {
    throw new NotFoundError(`No service with id :${serviceId}`);
  }

  const updatedService = await Service.findOneAndUpdate(
    { _id: serviceId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedService });
};

/* ------------- LIST ITEM ------------- */
/**
 * @desc Create List Item
 * @route POST /api/service/list
 * @access Private/Admin
 */
const createListItem = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    throw new BadRequestError('Please provide all values');
  }

  const listItem = await ServiceList.create(req.body);

  res.status(StatusCodes.CREATED).json({ listItem });
};

/**
 * @desc Get All Service List
 * @route GET /api/service/list
 * @access Private/Admin
 */
const getAllServiceList = async (req, res) => {
  const serviceList = await ServiceList.find();

  res.status(StatusCodes.OK).json(serviceList);
};

/**
 * @desc Update List Item
 * @route PATCH /api/service/list/:id
 * @access Private/Admin
 */
const updateListItem = async (req, res) => {
  const { id: listItemId } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    throw new BadRequestError('Please provide all values');
  }

  const listItem = await ServiceList.findOne({ _id: listItemId });

  if (!listItem) {
    throw new NotFoundError(`No list item with id :${listItemId}`);
  }

  const updatedListItem = await ServiceList.findOneAndUpdate(
    { _id: listItemId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedListItem });
};

/**
 * @desc Delete List Item
 * @route DELETE /api/service/list/:id
 * @access Private/Admin
 */
const deleteListItem = async (req, res) => {
  const { id: listItemId } = req.params;
  const listItem = await ServiceList.findOne({ _id: listItemId });

  if (!listItem) {
    throw new NotFoundError(`No list item with id :${listItemId}`);
  }

  await listItem.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! List Item removed' });
};

export {
  createService,
  getService,
  updateService,
  createListItem,
  getAllServiceList,
  updateListItem,
  deleteListItem,
};
