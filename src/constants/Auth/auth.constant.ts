export const AUTH_CONSTANT = {
  COMMON: {
    HASH_SALT: 10,
    JWT: {
      KEY_NAME: 'JWT_SECRET_KEY',
      EXPIRES_IN: '12h',
      BEARER: 'Bearer',
    },
    PASSPORT: {
      DEFAULT_STRATEGY: 'jwt',
    },
  },
  REFRESH_TOKEN_GUARD: {
    HEADERS: 'authorization',
    USER: 'user',
  },
  LOCAL_STRATEGY: {
    USER_NAME_FIELD: 'email',
    PASSWORD_FIELD: 'password',
  },
};
