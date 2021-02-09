const newsSchema = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        limit: { type: 'integer' },
      },
    },
  },
};

const cardSchema = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        provider: {
          type: 'string',
          enum: ['tts', 'tgt'],
          default: 'tgt',
        },
      },
      required: ['id'],
    },
  },
};

const userCardSchema = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          id: { type: 'string' },
        },
      },
    },
  },
};

const userSchema = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          cards: {
            type: 'array',
            items: {
              properties: {
                name: { type: 'string' },
                id: { type: 'string' },
              },
            },
          },
          settings: {
            type: 'object',
            properties: {
              main: { type: 'string' },
              theme: { type: 'string' },
            },
          },
        },
      },
    },
  },
};

const getCardSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      required: ['id'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          id: { type: 'string' },
        },
      },
    },
  },
};

const addCardSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        id: {
          type: 'string', minLength: 10, maxLength: 19,
        },
        name: { type: 'string', minLength: 1, maxLength: 20 },
      },
      required: ['id', 'name'],
    },
    response: {
      200: {
        type: 'array',
        items: {
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
          },
        },
      },
    },
  },
};

const deleteCardSchema = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      required: ['id'],
    },
    response: {
      200: {
        type: 'array',
        items: {
          properties: {
            name: { type: 'string' },
            id: { type: 'string' },
          },
        },
      },
    },
  },
};

const patchCardSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string', minLength: 1, maxLength: 20 },
      },
    },
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      required: ['id'],
    },
    response: {
      200: {
        type: 'array',
        items: {
          properties: {
            name: { type: 'string' },
            id: { type: 'string' },
          },
        },
      },
    },
  },
};

const userSettingsSchema = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          main: { type: 'string' },
          theme: { type: 'string', enum: ['light', 'dark'] },
        },
      },
    },
  },
};

const patchSettingsSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        main: {
          type: 'string', minLength: 10, maxLength: 19,
        },
        theme: { type: 'string', enum: ['light', 'dark'] },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          main: { type: 'string' },
          theme: { type: 'string', enum: ['light', 'dark'] },
        },
      },
    },
  },
};

export {
  newsSchema, cardSchema, userSchema, getCardSchema,
  addCardSchema, deleteCardSchema, patchCardSchema,
  userCardSchema, userSettingsSchema, patchSettingsSchema,
};
