import { Request, Router } from 'express'
import { apiLimiter } from "../middleware/rate-limiter.middleware";
import { verifyToken } from "../middleware/auth.service.middleware";
import routerAuth from "./auth.service.route";
import routerService from "./services.routes";



const router = Router()

interface CustomRequest extends Request {
    service?: string;
}

router.use('/api', verifyToken, apiLimiter)

router.get('/api/service/data', (req: CustomRequest, res) => {
    res.json({
        status: 'success',
        message: `Received request from ${req.service} service`
    })
})

const defaultRoutes = [
    {
        path: '/api/service/auth',
        route: routerAuth
    },
    {
        path: '/api/service/',
        route: routerService
    }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})


export default router