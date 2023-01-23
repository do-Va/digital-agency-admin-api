import ContactUs from '../models/ContactUs.js';
import ContactUsList from '../models/ContactUsList.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

/**
 * @desc Create Contact Us
 * @route POST /api/contact-us/
 * @access Private/Admin
 */
const createContactUs = async (req, res) => {
  const { title, buttonContent, image } = req.body;

  if (!title || !buttonContent || !image) {
    throw new BadRequestError('Please provide all values');
  }

  const contactUs = await ContactUs.create(req.body);

  res.status(StatusCodes.CREATED).json({ contactUs });
};

/**
 * @desc Get Contact Us
 * @route GET /api/contact-us/:id
 * @access Private/Admin
 */
const getContactUs = async (req, res) => {
  const contactUs = await ContactUs.find();

  res.status(StatusCodes.OK).json(contactUs);
};

/**
 * @desc Update Contact Us
 * @route PATCH /api/contact-us/:id
 * @access Private/Admin
 */
const updateContactUs = async (req, res) => {
  const { id: contactUsId } = req.params;
  const { title, buttonContent, image } = req.body;

  if (!title || !buttonContent || !image) {
    throw new BadRequestError('Please provide all values');
  }

  const contactUs = await ContactUs.findOne({ _id: contactUsId });

  if (!contactUs) {
    throw new NotFoundError(`No contact us with id :${contactUsId}`);
  }

  const updatedContactUs = await ContactUs.findOneAndUpdate(
    { _id: contactUsId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedContactUs });
};

/* ------------- Contact Member ------------- */
/**
 * @desc Create Contact Member
 * @route POST /api/contact-us/list
 * @access Private/Admin
 */
const createContactMember = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    throw new BadRequestError('Please provide all values');
  }

  const contactMember = await ContactUsList.create(req.body);

  res.status(StatusCodes.CREATED).json({ contactMember });
};

/**
 * @desc Get All Contact Members
 * @route GET /api/contact-us/list
 * @access Private/Admin
 */
const getAllContactMembers = async (req, res) => {
  const contactMembers = await ContactUsList.find();

  res.status(StatusCodes.OK).json(contactMembers);
};

export {
  createContactUs,
  getContactUs,
  updateContactUs,
  createContactMember,
  getAllContactMembers,
};
