import { logger } from '../lib/logger.js';

const notFound = async (req, res) => {
  logger.info(`404 request ${req.method} ${req.url}`, { label: 'Router' });
  res.send({
    code: 404,
    detail: 'Not found',
  });
};

export default notFound;
