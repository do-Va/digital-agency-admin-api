import About from '../models/About.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

/**
 * @desc Create About
 * @route POST /api/about/
 * @access Private/Admin
 */
const createAbout = async (req, res) => {
  const { title, description, buttonContent, image } = req.body;

  if (!title || !description || !buttonContent || !image) {
    throw new BadRequestError('Please provide all values');
  }

  const about = await About.create(req.body);

  res.status(StatusCodes.CREATED).json({ about });
};

/**
 * @desc Get About
 * @route GET /api/about/:id
 * @access Private/Admin
 */
const getAbout = async (req, res) => {
  const about = await About.find();

  res.status(StatusCodes.OK).json(about);
};

/**
 * @desc Update About
 * @route PATCH /api/about/:id
 * @access Private/Admin
 */
const updateAbout = async (req, res) => {
  const { id: aboutId } = req.params;
  const { title, description, buttonContent, image } = req.body;

  if (!title || !description || !buttonContent || !image) {
    throw new BadRequestError('Please provide all values');
  }

  const about = await About.findOne({ _id: aboutId });

  if (!about) {
    throw new NotFoundError(`No about with id :${aboutId}`);
  }

  const updatedAbout = await About.findOneAndUpdate(
    { _id: aboutId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedAbout });
};

export { createAbout, getAbout, updateAbout };
