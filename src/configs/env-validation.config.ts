import Joi from 'joi';

export const configModuleValidationSchema = Joi.object({
  SERVER_PORT: Joi.number().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_SYNC: Joi.boolean().required(),
});

//  DB 정보 등록 안해서 읽을수없다고 뜰겁니다
