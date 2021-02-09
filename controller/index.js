/*
import { createHash } from 'crypto';
import axios from 'axios';

const getCard = async (request) => {
  const { id, provider } = request.query;

  const date = (new Date())
    .toLocaleDateString('en-GB')
    .replace(/\//g, '.');

  const hash = createHash('md5')
    .update(`${date}.${id}`)
    .digest('hex');

  const options = {
    baseURL: provider === 'tts' ? 'https://oao-tts.ru' : 'https://api.tgt72.ru',
    url: provider === 'tts' ? '/services/lnt/infoBalansCard.php' : '/api/v5/balance',
    method: 'GET',
    params: provider === 'tts' ? {
      numberCard: id,
      h: hash,
      tf: 'json',
    } : {
      card: id,
      hash,
    },
  };

  try {
    const { data } = await axios(options);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const getNews = async (request) => {
  const options = {
    baseURL: 'https://api.tgt72.ru',
    url: '/api/v5/news',
    method: 'GET',
    params: {
      limit: request.query.limit,
    },
  };

  try {
    const { data } = await axios(options);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
*/

const getCard = async (request, reply) => {
  const card = request.user.cards.find((item) => item.id === request.params.id);

  if (!card) {
    return reply.callNotFound();
  }

  return card;
};

const addCard = async (request) => {
  const card = request.user.cards.find((item) => item.id === request.body.id);

  if (!card) {
    request.user.cards.push(request.body);
    request.user.save();
  }

  return request.user.cards;
};

const deleteCard = async (request) => {
  request.user.cards = request.user.cards.filter((item) => item.id !== request.params.id);
  request.user.save();

  return request.user.cards;
};

const patchCard = async (request) => {
  delete request.body.id; // запрещаем менять очень нужные поля

  const index = request.user.cards.findIndex((item) => item.id === request.params.id);
  if (request.user.cards[index]) {
    Object.assign(request.user.cards[index], request.body);
    request.user.save();
  }

  return request.user.cards;
};

const patchSettings = async (request) => {
  Object.assign(request.user.settings, request.body);
  request.user.save();

  return request.user.settings;
};

export {
  getCard, addCard, deleteCard, patchCard, patchSettings,
};
