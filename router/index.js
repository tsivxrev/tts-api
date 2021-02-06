import restana from 'restana';

import notFound from './404.js';
import { card, news } from '../controller/index.js';

const router = restana({
  defaultRoute: notFound,
}).newRouter();

router
  .get('/card', card)
  .get('/news', news);

export default router;
