import express from "express";
import cors from 'cors'
import helmet from "helmet";
import routes from "./api/router/index"
import { config } from './config'
import {loggerMiddleware} from "./api/middleware/logger.middleware";
import {apiLimiter} from "./api/middleware/rate-limiter.middleware";
import {errorHandler} from "./utils/error-handler";

const app = express()

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(loggerMiddleware)
app.use(cors())
app.use(apiLimiter)

app.get("/status", (req, res, next) => {
    res.status(200).json({
        status: "UP",
        timestamp: new Date(),
        environment: config.app.environment
    })
})

if (process.env.NODE_ENV === 'production') {
    // Trust Railway's proxy and your specific gateway
    const trustedProxies = ['127.0.0.1', 'loopback'];

    // Add your gateway IP if it's acting as a proxy
    if (process.env.GATEWAY_FORWARDER) {
        trustedProxies.push(process.env.GATEWAY_FORWARDER);
    }
    if (process.env.GATEWAY_REAL_IP) {
        trustedProxies.push(process.env.GATEWAY_REAL_IP);
    }

    app.set('trust proxy', trustedProxies);
} else {
    // In development, trust localhost and your gateway
    app.set('trust proxy', ['127.0.0.1', 'loopback', process.env.GATEWAY_FORWARDER || '66.33.22.177']);
}

app.use("/", routes)

app.use((req, res, next) => {
    res.status(404).json({
        status: "error",
        message: "Not Found"
    })
})

app.use(errorHandler)


export default app