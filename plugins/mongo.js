import mongoose from 'mongoose';
import fp from 'fastify-plugin';

export default fp(async (fastify, opts) => {
  mongoose.connect(opts.url, opts.params);

  mongoose.connection.on('error', (e) => {
    fastify.log.error(e);
  });

  mongoose.connection.on('connected', () => fastify.log.info('MongoDB connected!'));
  fastify.decorateRequest('user', null); // для хранения стейта юзера в объекте реквеста
});
