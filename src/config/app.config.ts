import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("development", "production", "test")
      .required(),
    PORT: Joi.number().default(3000),
    ALLOWED_ORIGINS: Joi.string().required(),
    RATE_LIMIT: Joi.number().default(100),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server.'),
    SMTP_USERNAME: Joi.string().description('username for email server.'),
    SMTP_PASSWORD: Joi.string().description('password for the email server.'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

export const appConfig = {
  port: envVars.PORT,
  environment: envVars.NODE_ENV,
  corsOptions: {
    origin: envVars.ALLOWED_ORIGINS.split(","),
    method: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-API-KEY"],
  },
  rateLimiter: {
    windowMs: 15 * 60 * 1000,
    max: envVars.RATE_LIMIT,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      }
    },
    from: envVars.EMAIL_FROM,
  }
};
