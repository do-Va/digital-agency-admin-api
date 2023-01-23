import Hero from '../models/Hero.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

/**
 * @desc Create Hero
 * @route POST /api/hero/
 * @access Private/Admin
 */
const createHero = async (req, res) => {
  const { title, buttonContent, image } = req.body;

  if (!title || !buttonContent || !image) {
    throw new BadRequestError('Please provide all values');
  }

  const hero = await Hero.create(req.body);

  res.status(StatusCodes.CREATED).json({ hero });
};

/**
 * @desc Get Hero
 * @route GET /api/hero/:id
 * @access Private/Admin
 */
const getHero = async (req, res) => {
  const hero = await Hero.find();

  res.status(StatusCodes.OK).json(hero);
};

/**
 * @desc Update Hero
 * @route PATCH /api/hero/:id
 * @access Private/Admin
 */
const updateHero = async (req, res) => {
  const { id: heroId } = req.params;
  const { title, buttonContent, image } = req.body;

  if (!title || !buttonContent || !image) {
    throw new BadRequestError('Please provide all values');
  }

  const hero = await Hero.findOne({ _id: heroId });

  if (!hero) {
    throw new NotFoundError(`No hero with id :${heroId}`);
  }

  const updatedHero = await Hero.findOneAndUpdate({ _id: heroId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedHero });
};

export { createHero, getHero, updateHero };
