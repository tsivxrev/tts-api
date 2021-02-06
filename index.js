//
// Backend for https://github.com/xvtn/tts
// Written with love by nitroauth (xvtn), 2021.
//

import dotenv from 'dotenv';
import restana from 'restana';
import bodyParser from 'body-parser';
import { logger } from './lib/logger.js';

import router from './router/index.js';
import notFound from './router/404.js';

const PORT = process.env.PORT || 3000;

dotenv.config();
const service = restana({
  defaultRoute: notFound,
});

service.use(bodyParser.json());
service.use('/v1', router);

const profiler = logger.startTimer();
service.start(PORT).then(() => {
  profiler.done({ message: `Server has been started on port ${PORT}`, label: 'Service' });
});
