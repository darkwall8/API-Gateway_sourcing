import { createProxyMiddleware } from "http-proxy-middleware";
import { Request, Response } from "express";
import { config } from "../../config";
import { logger } from "../../utils/logger";

export const createServiceProxy = (
    serviceName: string,
    serviceUrl: string,
    pathRewrite: {
      [regexp: string]: string;
    },
) => {
  return createProxyMiddleware({
    target: serviceUrl,
    changeOrigin: true,
    pathRewrite: pathRewrite,
    secure: config.app.environment === "production",

    on: {
      proxyReq: (proxyReq, req, res) => {
        const expressReq = req as unknown as Request;

        // Header pour identifier le gateway
        // proxyReq.setHeader('X-Gateway-secret', '7fba8f98e172836d294b24d70b1842c94c795afa');
        // proxyReq.setHeader('X-Real-IP', '66.33.22.177');
        // proxyReq.setHeader('X-Forwarded-For', '66.33.22.177');

        // Log des informations de la requête
        logger.info(`[${serviceName}] Proxy request:`, {
          method: proxyReq.method,
          path: proxyReq.path,
          originalUrl: expressReq.originalUrl,
          headers: proxyReq.getHeaders(),
          query: expressReq.query,
          target: serviceUrl
        });

        // Gestion du body pour les requêtes POST/PUT/PATCH
        if (expressReq.body && Object.keys(expressReq.body).length > 0) {
          const bodyData = JSON.stringify(expressReq.body);

          // Log du body de la requête
          logger.info(`[${serviceName}] Request body:`, expressReq.body);

          // Correction: Content-Length au lieu de Content-Type pour la taille
          proxyReq.setHeader('Content-Type', 'application/json');
          proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
          proxyReq.write(bodyData);
        }
      },

      proxyRes: (proxyRes, req, res) => {
        const expressReq = req as unknown as Request;

        logger.info(`[${serviceName}] Proxy response:`, {
          statusCode: proxyRes.statusCode,
          statusMessage: proxyRes.statusMessage,
          path: expressReq.originalUrl,
          headers: proxyRes.headers
        });

        // Log du body de la réponse (optionnel)
        let responseBody = '';
        proxyRes.on('data', (chunk) => {
          responseBody += chunk.toString();
        });

        proxyRes.on('end', () => {
          if (responseBody) {
            try {
              const parsedBody = JSON.parse(responseBody);
              logger.info(`[${serviceName}] Response body:`, parsedBody);
            } catch (error) {
              logger.info(`[${serviceName}] Response body (raw):`, responseBody);
            }
          }
        });
      },

      error: (err, req, res) => {
        const expressRes = res as unknown as Response;
        const expressReq = req as unknown as Request;

        logger.error(`[${serviceName}] Proxy error:`, {
          error: err.message,
          stack: err.stack,
          path: expressReq.originalUrl,
          method: expressReq.method
        });

        expressRes.status(500).json({
          status: "error",
          message: `Error connecting to the ${serviceName}`
        });
      }
    }
  });
};