import Testimonial from '../models/Testimonial.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

/**
 * @desc Create Testimonial Member
 * @route POST /api/testimonial/
 * @access Private/Admin
 */
const createTestimonialMember = async (req, res) => {
  const { name, title, description, image } = req.body;

  if (!name || !title || !description || !image) {
    throw new BadRequestError('Please provide all values');
  }

  const testimonialMember = await Testimonial.create(req.body);

  res.status(StatusCodes.CREATED).json({ testimonialMember });
};

/**
 * @desc Get All Testimonials
 * @route GET /api/testimonial/
 * @access Private/Admin
 */
const getAllTestimonials = async (req, res) => {
  const testimonials = await Testimonial.find();

  res.status(StatusCodes.OK).json(testimonials);
};

/**
 * @desc Update Testimonial Member
 * @route PATCH /api/testimonial/:id
 * @access Private/Admin
 */
const updateTestimonialMember = async (req, res) => {
  const { id: testimonialMemberId } = req.params;
  const { name, title, description, image } = req.body;

  if (!name || !title || !description || !image) {
    throw new BadRequestError('Please provide all values');
  }

  const testimonialMember = await Testimonial.findOne({
    _id: testimonialMemberId,
  });

  if (!testimonialMember) {
    throw new NotFoundError(
      `No testimonial member with id :${testimonialMemberId}`
    );
  }

  const updatedTestimonialMember = await Testimonial.findOneAndUpdate(
    { _id: testimonialMemberId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedTestimonialMember });
};

/**
 * @desc Delete Testimonial Member
 * @route DELETE /api/testimonial/:id
 * @access Private/Admin
 */
const deleteTestimonialMember = async (req, res) => {
  const { id: testimonialMemberId } = req.params;
  const testimonialMember = await Testimonial.findOne({
    _id: testimonialMemberId,
  });

  if (!testimonialMember) {
    throw new NotFoundError(
      `No testimonial member with id :${testimonialMemberId}`
    );
  }

  await testimonialMember.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! Team Member removed' });
};

export {
  createTestimonialMember,
  getAllTestimonials,
  updateTestimonialMember,
  deleteTestimonialMember,
};
