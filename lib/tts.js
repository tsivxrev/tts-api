import { createHash } from 'crypto';
import axios from 'axios';

const getCard = async (cardId, provider = 'tgt') => {
  const date = (new Date()) // Дата в формате ДД.ММ.ГГГГ
    .toLocaleDateString('en-GB')
    .replace(/\//g, '.');

  const hash = createHash('md5') // Хеш карты для валидации на сервере ТТС
    .update(`${date}.${cardId}`) // ДД.ММ.ГГГГ.НОМЕР_КАРТЫ в md5
    .digest('hex');

  const options = {
    baseURL: provider === 'tts' ? 'https://oao-tts.ru' : 'https://api.tgt72.ru',
    url: provider === 'tts' ? '/services/lnt/infoBalansCard.php' : '/api/v5/balance',
    method: 'GET',
    params: provider === 'tts' ? {
      numberCard: cardId,
      h: hash,
      tf: 'json',
    } : {
      card: cardId,
      hash,
    },
  };

  try {
    const { data } = await axios(options);
    return data;
  } catch (error) {
    return {
      error: error.response.status === 400 ? 'Введен не корректный номер карты' : 'Сервис недоступен.',
      detail: error,
    };
  }
};

const getNews = async (limit = 15) => {
  const options = {
    baseURL: 'https://api.tgt72.ru',
    url: '/api/v5/news',
    method: 'GET',
    params: {
      limit,
    },
  };

  try {
    const { data } = await axios(options);
    return data;
  } catch (error) {
    return {
      error: 'Сервис недоступен.',
      detail: error,
    };
  }
};

export { getCard, getNews };
