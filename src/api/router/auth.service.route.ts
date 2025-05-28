import { Router } from 'express'
import { apiLimiter } from "../middleware/rate-limiter.middleware";
import { authenticateService } from "../controllers/authenticate.controller";

const routerAuth = Router()

routerAuth.post('/api/service/auth', apiLimiter, authenticateService)

export default routerAuth;