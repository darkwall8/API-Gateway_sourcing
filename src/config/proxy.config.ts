import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    PROFILE_MANAGEMENT_SERVICE_URL: Joi.string().uri().required(),
    OFFERS_SERVICE_URL: Joi.string().uri().required(),
    APPLICATION_SERVICE_URL: Joi.string().uri().required(),
    MESSAGING_SERVICE_URL: Joi.string().uri().required(),
    SMTP_SERVICE_URL: Joi.string().uri().required(),
    REPORTING_HISTORY_SERVICE_URL: Joi.string().uri().required(),
    MODERATION_SERVICE: Joi.string().uri().required(),
    NODE_ENV: Joi.string()
      .valid("development", "production", "test")
      .required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

export const proxyConfig = {
    profileManagementService: {
        target: envVars.PROFILE_MANAGEMENT_SERVICE_URL,
        pathRewrite: {
            "^profile": "/api/profile",
        },
        changeOrigin: true,
        secure: envVars.NODE_ENV === "production",
    },
    offersService: {
        target: envVars.OFFERS_SERVICE_URL,
        pathRewrite: {
            "^offers": "/api/offers",
        },
        changeOrigin: true,
        secure: envVars.NODE_ENV === "production",
    },
    applicationService: {
        target: envVars.APPLICATION_SERVICE_URL,
        pathRewrite: {
            "^application": "/api/application",
        },
        changeOrigin: true,
        secure: envVars.NODE_ENV === "production",
    },
    messagingService: {
        target: envVars.MESSAGING_SERVICE_URL,
        pathRewrite: {
            "^messaging": "/api/messaging",
        },
        changeOrigin: true,
        secure: envVars.NODE_ENV === "production",
    },
    mailService: {
        target: envVars.SMTP_SERVICE_URL,
        pathRewrite: {
            "^mail": "/api/mail",
        },
        changeOrigin: true,
        secure: envVars.NODE_ENV === "production",
    },
    reportingAndHistoryService: {
        target: envVars.REPORTING_HISTORY_SERVICE_URL,
        pathRewrite: {
            "^reportingAndHistory": "/api/reportingAndHistory",
        },
        changeOrigin: true,
        secure: envVars.NODE_ENV === "production",
    },
    moderationService: {
        target: envVars.MODERATION_SERVICE,
        pathRewrite: {
            "^moderation": "/api/moderation",
        },
        changeOrigin: true,
        secure: envVars.NODE_ENV === "production",
    },

}