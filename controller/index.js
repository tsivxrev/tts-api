import { getCard, getNews } from '../lib/tts.js';

const card = async (req, res) => {
  try {
    const cardInfo = await getCard(req.body.id, req.body.provider);

    if (Object.prototype.hasOwnProperty.call(cardInfo, 'error')) {
      res.send({
        code: -2,
        detail: cardInfo.error,
      }, 400);
    } else {
      res.send(cardInfo, 200);
    }
  } catch (error) {
    res.send(error, 400);
  }
};

const news = async (req, res) => {
  try {
    const newsInfo = await getNews(req.body.limit);
    res.send(newsInfo, 200);
  } catch (error) {
    res.send(error, 400);
  }
};

export { card, news };
