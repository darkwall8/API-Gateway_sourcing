import express from "express";
import cors from 'cors'
import helmet from "helmet";
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

app.use((req, res, next) => {
    res.status(404).json({
        status: "error",
        message: "Not Found"
    })
})

app.use(errorHandler)


export default app