import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';
import attachCookie from '../utils/attachCookie.js';

/**
 *@desc Auth Admin & get token
 *@route POST /api/auth/login
 *@access Private/Admin
 */
const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('please provide all values');
  }

  // Benzer email var mı?
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use');
  }

  const user = await User.create({ email, password });

  const token = user.createJWT();

  // tokenı cookie olarak gönder.
  attachCookie({ res, token });

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
    },
  });
};

/**
 * @desc Register Admin
 * @route POST /api/auth/register
 * @access Private/Admin
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide all values');
  }

  // Bu emaile sahip user var mı kontrol et
  const user = await User.findOne({ email }).select('+password');

  // eğer yoksa hata gönder
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }

  // hashli password ile girilen passwordu karşılaştır.
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials');
  }

  const token = user.createJWT();

  attachCookie({ res, token });
  user.password = undefined;

  res.status(StatusCodes.OK).json({ user });
};

/**
 * @desc Logout Admin
 * @route GET /api/auth/logout
 * @access Private/Admin
 */
const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });

  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

export { register, login, logout };
