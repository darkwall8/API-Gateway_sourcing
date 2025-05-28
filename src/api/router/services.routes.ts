import { Request, Router } from 'express'
import { proxy } from '../controllers/proxy.controller'



const routerService = Router();

interface CustomRequest extends Request {
    service?: string;
}

routerService.get('/api/service/data', (req:CustomRequest, res) => {
    res.json({
        status: 'success',
        message: `Hello ${req.service}`,
        data: {name: "Api-Gateway working"}
    })
})

routerService.use('/api/service/mail', proxy.createMailServiceProxy)
routerService.use('/api/service/database', proxy.createIMMServiceProxy)
routerService.use('/api/service/moderation', proxy.createModerationServiceProxy)
routerService.use('/api/service/application', proxy.createApplicationServiceProxy)
routerService.use('/api/service/offers', proxy.createOffersServiceProxy)
routerService.use('/api/service/reporting-history', proxy.createReportingAndHistoryServiceProxy)
routerService.use('/api/service/messaging', proxy.createMessagingServiceProxy)
routerService.use('/api/service/profile', proxy.createProfileManagementServiceProxy)

export default routerService;