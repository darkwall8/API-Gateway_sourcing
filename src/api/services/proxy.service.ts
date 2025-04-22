import { createProxyMiddleware } from "http-proxy-middleware";
import { Request, Response } from "express";
import { config } from "../../config";
import { logger } from "../../utils/logger";


export const createServiceProxy = (
  serviceName: string,
  serviceUrl: string,
  pathRewrite: { [regexp: string]: string },
) => {
  return createProxyMiddleware({
    target: serviceUrl,
    changeOrigin: true,
    pathRewrite,
    secure: config.app.environment === "production",

    on: {
      proxyReq: (proxyReq, req, res) =>{
        const expressReq = req as unknown as Request;
        proxyReq.setHeader('', 'API-Gateway')

        if (expressReq.body && Object.keys(expressReq.body).length > 0) {
          const bodyData = JSON.stringify(expressReq.body);
          proxyReq.setHeader('Content-Type', 'application/json');
          proxyReq.setHeader('Content-Type', Buffer.byteLength(bodyData));
          proxyReq.write(bodyData)
        }
      },

      proxyRes: (proxyRes, req, res) => {
        logger.info(`Proxy response from ${serviceName}: ${proxyRes.statusCode}`)
      },

      error: (err, req, res) => {
        const expressRes = res as unknown as Response
        logger.error(`Proxy error: ${err.message}`)
        expressRes.status(500).json({
          status: "error",
          message: `Error connecting to the ${serviceName}`
        })
      }
    }
  });
};
