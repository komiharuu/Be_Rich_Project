export const AUTH_MESSAGE_CONSTANT = {
  COMMON: {
    USER_NOT_FOUND: '해당하는 사용자가 없습니다.',
    USER_UNAUTHORIZED: '인증된 사용자가 아닙니다.',
    INVALID_AUTH: '잘못된 인증입니다.',
    INVALID_TYPE: '잘못된 토큰 타입입니다.',
    EMAIL: {
      IS_NOT_EMPTY: '이메일을 입력해 주세요.',
    },
    NICKNAME: {
      IS_NOT_EMPTY: '닉네임을 입력해 주세요.',
    },
    PASSWORD: {
      IS_NOT_EMPTY: '비밀번호를 입력해 주세요.',
    },
  },
  SIGN_UP: {
    NOT_MATCH_PASSWORD: '비밀번호가 일치하지 않습니다.',
    CONFLICT_EMAIL: '중복된 이메일입니다.',
    CONFLICT_NICKNAME: '중복된 닉네임입니다.',
    PASSWORD_CHECK: {
      IS_NOT_EMPTY: '비밀번호 확인을 입력해 주세요.',
    },
  },
  SIGN_IN: {},
  SIGN_OUT: {
    SUCCEED: '로그아웃에 성공했습니다.',
    ALREADY: '이미 로그아웃한 상태입니다.',
  },
  REISSUE: {},
};
