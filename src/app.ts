import express from "express";
import cors from 'cors'
import helmet from "helmet";
import routes from "./api/router/index"
import { config } from './config'
import {loggerMiddleware} from "./api/middleware/logger.middleware";
import {apiLimiter} from "./api/middleware/rate-limiter.middleware";
import {errorHandler} from "./utils/error-handler";

const app = express()

// Configuration CORS - Autorise toutes les origines
const corsOptions = {
    origin: true, // Accepte toutes les origines (*)
    credentials: true, // Autoriser les cookies/sessions
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'X-API-Key',
        'Cache-Control'
    ],
    exposedHeaders: ['X-Total-Count'], // Headers exposés au client
    maxAge: 86400 // Cache preflight pendant 24h
};

app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(loggerMiddleware)

// Utiliser CORS pour toutes les origines
app.use(cors(corsOptions));

app.use(apiLimiter)

app.get("/status", (req, res, next) => {
    res.status(200).json({
        status: "UP",
        timestamp: new Date(),
        environment: config.app.environment
    })
})

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', true);
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