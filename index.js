//
// Backend for https://github.com/xvtn/tts
// Written with love by nitroauth (xvtn), 2021.
//

import dotenv from 'dotenv';
import fastify from 'fastify';
import mongo from './plugins/mongo.js';

import router from './router/index.js';

dotenv.config();
const service = fastify({
  logger: {
    prettyPrint: true,
    serializers: {
      res(reply) {
        return {
          statusCode: reply.statusCode,
        };
      },
      req(request) {
        return {
          method: request.method,
          url: request.url,
          path: request.path,
          parameters: request.parameters,
          headers: request.headers,
        };
      },
    },
  },
});

service.register(mongo, {
  url: process.env.MONGO_URL,
  params: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  },
});
service.register(router, { prefix: '/v1' });

const start = async () => {
  try {
    await service.listen(process.env.PORT);
  } catch (err) {
    service.log.error(err);
    process.exit(1);
  }
};
start();
