import NewsLetter from '../models/NewsLetter.js';
import NewsLetterList from '../models/NewsLetterList.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

/**
 * @desc Create NewsLetter
 * @route POST /api/newsletter/
 * @access Private/Admin
 */
const createNewsLetter = async (req, res) => {
  const { title, buttonContent, image } = req.body;

  if (!title || !buttonContent || !image) {
    throw new BadRequestError('Please provide all values');
  }

  const newsLetter = await NewsLetter.create(req.body);

  res.status(StatusCodes.CREATED).json({ newsLetter });
};

/**
 * @desc Get NewsLetter
 * @route GET /api/newsletter/:id
 * @access Private/Admin
 */
const getNewsLetter = async (req, res) => {
  const newsLetter = await NewsLetter.find();

  res.status(StatusCodes.OK).json(newsLetter);
};

/**
 * @desc Update NewsLetter
 * @route PATCH /api/newsletter/:id
 * @access Private/Admin
 */
const updateNewsLetter = async (req, res) => {
  const { id: newsLetterId } = req.params;
  const { title, buttonContent, image } = req.body;

  if (!title || !buttonContent || !image) {
    throw new BadRequestError('Please provide all values');
  }

  const newsLetter = await NewsLetter.findOne({ _id: newsLetterId });

  if (!newsLetter) {
    throw new NotFoundError(`No newsLetter with id :${newsLetterId}`);
  }

  const updatedNewsLetter = await NewsLetter.findOneAndUpdate(
    { _id: newsLetterId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedNewsLetter });
};

/* ------------- NewsLetter Member ------------- */
/**
 * @desc Create NewsLetter
 * @route POST /api/newsletter/list
 * @access Private/Admin
 */
const createNewsLetterMember = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    throw new BadRequestError('Please provide all values');
  }

  const newsLetterMember = await NewsLetterList.create(req.body);

  res.status(StatusCodes.CREATED).json({ newsLetterMember });
};

/**
 * @desc Get All NewsLetters
 * @route GET /api/newsletter/list
 * @access Private/Admin
 */
const getAllNewsLetterMembers = async (req, res) => {
  const newsLetterMembers = await NewsLetterList.find();

  res.status(StatusCodes.OK).json(newsLetterMembers);
};

export {
  createNewsLetter,
  getNewsLetter,
  updateNewsLetter,
  createNewsLetterMember,
  getAllNewsLetterMembers,
};
