import OurTeam from '../models/OurTeam.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

/**
 * @desc Create Team Member
 * @route POST /api/our-teams/
 * @access Private/Admin
 */
const createTeamMember = async (req, res) => {
  const { name, title, image } = req.body;

  if (!name || !title || !image) {
    throw new BadRequestError('Please provide all values');
  }

  const teamMember = await OurTeam.create(req.body);

  res.status(StatusCodes.CREATED).json({ teamMember });
};

/**
 * @desc Get All Our Teams
 * @route GET /api/our-teams/
 * @access Private/Admin
 */
const getAllOurTeams = async (req, res) => {
  const ourTeams = await OurTeam.find();

  res.status(StatusCodes.OK).json(ourTeams);
};

/**
 * @desc Update Team Member
 * @route PATCH /api/our-teams/:id
 * @access Private/Admin
 */
const updateTeamMember = async (req, res) => {
  const { id: teamMemberId } = req.params;
  const { name, title, image } = req.body;

  if (!name || !title || !image) {
    throw new BadRequestError('Please provide all values');
  }

  const teamMember = await OurTeam.findOne({ _id: teamMemberId });

  if (!teamMember) {
    throw new NotFoundError(`No team member with id :${teamMemberId}`);
  }

  const updatedTeamMember = await OurTeam.findOneAndUpdate(
    { _id: teamMemberId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedTeamMember });
};

/**
 * @desc Delete Team Member
 * @route DELETE /api/our-teams/:id
 * @access Private/Admin
 */
const deleteTeamMember = async (req, res) => {
  const { id: teamMemberId } = req.params;
  const teamMember = await OurTeam.findOne({ _id: teamMemberId });

  if (!teamMember) {
    throw new NotFoundError(`No team member with id :${teamMemberId}`);
  }

  await teamMember.remove();
  res.status(StatusCodes.OK).json({ msg: 'Success! Team Member removed' });
};

export { createTeamMember, getAllOurTeams, updateTeamMember, deleteTeamMember };
