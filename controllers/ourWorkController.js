import OurWork from '../models/OurWork.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

/**
 * @desc Create Work Item
 * @route POST /api/our-works/
 * @access Private/Admin
 */
const createWorkItem = async (req, res) => {
  const { image, alt } = req.body;

  if (!alt || !image) {
    throw new BadRequestError('Please provide all values');
  }

  const workItem = await OurWork.create(req.body);

  res.status(StatusCodes.CREATED).json({ workItem });
};

/**
 * @desc Get All Our Works
 * @route GET /api/our-works/
 * @access Private/Admin
 */
const getAllOurWorks = async (req, res) => {
  const ourWorks = await OurWork.find();

  res.status(StatusCodes.OK).json(ourWorks);
};

/**
 * @desc Update Work Item
 * @route PATCH /api/our-works/:id
 * @access Private/Admin
 */
const updateWorkItem = async (req, res) => {
  const { id: workItemId } = req.params;
  const { alt, image } = req.body;

  console.log(req.body);

  if (!alt || !image) {
    throw new BadRequestError('Please provide all values');
  }

  const workItem = await OurWork.findOne({ _id: workItemId });

  if (!workItem) {
    throw new NotFoundError(`No work item with id :${workItemId}`);
  }

  const updatedWorkItem = await OurWork.findOneAndUpdate(
    { _id: workItemId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedWorkItem });
};

/**
 * @desc Delete Work Item
 * @route DELETE /api/our-work/:id
 * @access Private/Admin
 */
const deleteWorkItem = async (req, res) => {
  const { id: workItemId } = req.params;
  const workItem = await OurWork.findOne({ _id: workItemId });

  if (!workItem) {
    throw new NotFoundError(`No work item with id :${workItemId}`);
  }

  await workItem.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! Work Item removed' });
};

export { createWorkItem, getAllOurWorks, updateWorkItem, deleteWorkItem };
