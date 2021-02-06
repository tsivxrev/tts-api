import { getCard, getNews } from '../lib/tts.js';
import { logger } from '../lib/logger.js';

const card = async (req, res) => {
  const { id, provider } = req.body;
  logger.info(`getCard request: card: ${id}, provider: ${provider}`, { label: 'TTS Module' });

  try {
    const cardInfo = await getCard(id, provider);

    if (Object.prototype.hasOwnProperty.call(cardInfo, 'error')) {
      logger.error(`getCard request: card: ${id}, provider: ${provider}, error: ${cardInfo.error}`, { label: 'TTS Module' });
      res.send({
        code: -2,
        detail: cardInfo.error,
      }, 400);
    } else {
      res.send(cardInfo, 200);
      logger.info(`getCard request success: card: ${id}, provider: ${provider}, data: ${JSON.stringify(cardInfo)}`, { label: 'TTS Module' });
    }
  } catch (error) {
    logger.error(`getCard request: card: ${id}, provider: ${provider}, error: ${error}`, { label: 'TTS Module' });
    res.send(error, 400);
  }
};

const news = async (req, res) => {
  logger.info(`getNews request: limit: ${req.body.limit}`, { label: 'TTS Module' });

  try {
    const newsInfo = await getNews(req.body.limit);
    res.send(newsInfo, 200);
    logger.info(`getNews request success: limit: ${req.body.limit}, data: ${JSON.stringify(newsInfo)}`, { label: 'TTS Module' });
  } catch (error) {
    res.send(error, 400);
    logger.error(`getNews request success: limit: ${req.body.limit}, data: ${error}`, { label: 'TTS Module' });
  }
};

export { card, news };
