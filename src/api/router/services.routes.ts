import { Request, Router } from 'express'
import { proxy } from '../controllers/proxy.controller'



const routerService = Router();

interface CustomRequest extends Request {
    service?: string;
}

routerService.get('/data', (req:CustomRequest, res) => {
    res.json({
        status: 'success',
        message: `Hello ${req.service}`,
        data: {name: "Api-Gateway working"}
    })
})

routerService.use('/mail', proxy.createMailServiceProxy())
routerService.use('/database', proxy.createIMMServiceProxy())
routerService.use('/moderation', proxy.createModerationServiceProxy())
routerService.use('/application', proxy.createApplicationServiceProxy())
routerService.use('/offers', proxy.createOffersServiceProxy())
routerService.use('/reporting-history', proxy.createReportingAndHistoryServiceProxy())
routerService.use('/messaging', proxy.createMessagingServiceProxy())
routerService.use('/profile', proxy.createProfileManagementServiceProxy())

export default routerService;