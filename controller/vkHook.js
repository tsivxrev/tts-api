import { stringify, parse } from 'querystring';
import crypto from 'crypto';

import User from '../models/user.js';

const check = (params) => {
  const listOfParams = Object.entries(params)
    .filter((e) => e[0].startsWith('vk_'))
    .sort((a, b) => {
      if (a[0] < b[0]) {
        return -1;
      }
      if (a[0] > b[0]) {
        return 1;
      }
      return 0;
    });

  const paramsStr = stringify(
    listOfParams.reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {}),
  );

  const hmac = crypto.createHmac('sha256', process.env.VK_SECRET);
  hmac.update(paramsStr);
  const sign = hmac
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return sign;
};

export default async (request, reply) => {
  const { headers } = request;

  if (!headers['x-vk-sign']) {
    reply
      .code(401)
      .send({
        code: 42,
        detail: 'This app is intended to be used in VK environment only',
      });
  } else {
    const params = parse(headers['x-vk-sign']);
    const sign = check(params);

    if (sign !== params.sign) {
      reply
        .code(401)
        .send({
          code: 42,
          detail: 'Security error',
        });
    }

    let user = await User.findOne({ id: Number(params.vk_user_id) });
    if (!user) {
      user = new User({ id: params.vk_user_id });
      await user.save();
    }

    request.user = user;
  }
};
