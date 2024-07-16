export const AUTH_TEST_CONSTANT = {
  COMMON: {
    EMAIL: 'email',
    NICKNAME: 'nickname',
    PROFILE_IMG: 'profileImg',
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
    STRING_TYPE: 'string',
    TOKEN_EXPIRES_IN: '12h',
  },
  SIGN_UP: {
    PASSWORD_CHECK: 'different',
  },
};

export const AUTH_TEST_DUMMY = [
  {
    email: 'test@test.com',
    password: '123123',
    passwordCheck: '123123',
    nickname: 'Test',
  },
  {
    id: 1,
    email: 'test@test.com',
    nickname: 'Test',
    profileImg: 'test_profile_image_url',
    createdAt: '2024-07-05T23:08:07.001Z',
    updatedAt: '2024-07-05T23:08:07.001Z',
  },
  {
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  },
];
