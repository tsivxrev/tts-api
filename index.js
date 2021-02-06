//
// Backend for https://github.com/xvtn/tts
// Written with love by nitroauth (xvtn), 2021.
//

import restana from 'restana';
import bodyParser from 'body-parser';

import router from './router/index.js';
import notFound from './router/404.js';

const service = restana({
  defaultRoute: notFound,
});

service.use(bodyParser.json());
service.use('/v1', router);

service.start(3000);
