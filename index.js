import express from 'express';
import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import 'express-async-errors';

import {
  aboutRouter,
  authRouter,
  contactUsRouter,
  heroRouter,
  menuRouter,
  ourTeamRouter,
  ourWorksRouter,
  serviceRouter,
  testimonialRouter,
  newsLetterRouter,
} from './routes/index.js';

import connectDB from './db/connect.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

const app = express();
dotenv.config();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// routers
app.use('/api/auth', authRouter);
app.use('/api/menus', menuRouter);
app.use('/api/hero', heroRouter);
app.use('/api/about', aboutRouter);
app.use('/api/service', serviceRouter);
app.use('/api/our-teams', ourTeamRouter);
app.use('/api/our-works', ourWorksRouter);
app.use('/api/testimonial', testimonialRouter);
app.use('/api/contact-us', contactUsRouter);
app.use('/api/newsletter', newsLetterRouter);

app.get('/', (req, res) => {
  res.send('<h1>Hello World</>');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
