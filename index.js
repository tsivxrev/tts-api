//
// Backend for https://github.com/xvtn/tts
// Written with love by nitroauth (xvtn), 2021.
//

import dotenv from 'dotenv';
import restana from 'restana';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { logger } from './lib/logger.js';

import vk from './controller/vk.js';
import router from './router/index.js';
import notFound from './router/404.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 10000,
  connectTimeoutMS: 10000,
});

mongoose.connection.on('error', (error) => {
  logger.error(error, { label: 'MongoDB' });
});
mongoose.connection.on('connected', () => logger.info({ message: 'Connected', label: 'MongoDB' }));

const service = restana({
  defaultRoute: notFound,
});

service.use(bodyParser.json());
service.use(vk());
service.use('/v1', router);

const profiler = logger.startTimer();
service.start(PORT).then(() => {
  profiler.done({ message: `Started on port ${PORT}`, label: 'Service' });
});
