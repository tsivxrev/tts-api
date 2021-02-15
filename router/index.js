import {
  getCard, addCard, deleteCard, patchCard,
  patchSettings,
} from '../controller/index.js';
import vkHook from '../controller/vkHook.js';

import {
  userSchema, getCardSchema,
  addCardSchema, deleteCardSchema, patchCardSchema,
  userCardsSchema, userSettingsSchema, patchSettingsSchema,
} from '../models/schemas/index.js';

export default async function routes(fastify) {
  fastify.addHook('onRequest', vkHook);

  fastify.setNotFoundHandler((request, reply) => {
    reply
      .code(404)
      .send({
        code: -1,
        detail: 'Not found',
      });
  });

  fastify
    .get('/user', userSchema, async (request) => request.user)

    .get('/user/cards', userCardsSchema, async (request) => request.user.cards)
    .get('/user/cards/:id', getCardSchema, getCard)
    .patch('/user/cards/:id', patchCardSchema, patchCard)
    .delete('/user/cards/:id', deleteCardSchema, deleteCard)
    .post('/user/cards', addCardSchema, addCard)

    .get('/user/settings', userSettingsSchema, async (request) => request.user.settings)
    .patch('/user/settings', patchSettingsSchema, patchSettings);
}
