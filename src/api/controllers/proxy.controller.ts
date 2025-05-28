import { createServiceProxy } from "../services/proxy.service";
import { proxyConfig } from "../../config/proxy.config";

const createProfileManagementServiceProxy = () => {
  createServiceProxy(
    'profile management service',
    proxyConfig.profileManagementService.target,
    proxyConfig.profileManagementService.pathRewrite
  )
}

const createOffersServiceProxy = () => {
  createServiceProxy(
    'offers service',
    proxyConfig.offersService.target,
    proxyConfig.offersService.pathRewrite
  )
}

const createApplicationServiceProxy = () => {
  createServiceProxy(
    'application service',
    proxyConfig.applicationService.target,
    proxyConfig.applicationService.pathRewrite
  )
}

const createMessagingServiceProxy = () => {
  createServiceProxy(
    'messaging service',
    proxyConfig.messagingService.target,
    proxyConfig.messagingService.pathRewrite
  )
}

const createMailServiceProxy = () => {
  createServiceProxy(
    'mail service',
    proxyConfig.mailService.target,
    proxyConfig.mailService.pathRewrite
  )
}

const createReportingAndHistoryServiceProxy = () => {
  createServiceProxy(
    'reporting service',
    proxyConfig.reportingAndHistoryService.target,
    proxyConfig.reportingAndHistoryService.pathRewrite
  )
}

const createModerationServiceProxy = () => {
  createServiceProxy(
    'moderation service',
    proxyConfig.moderationService.target,
    proxyConfig.moderationService.pathRewrite
  )
}

const createIMMServiceProxy = () => {
  createServiceProxy(
      'IMM',
      proxyConfig.IMM.target,
      proxyConfig.IMM.pathRewrite

  )
}

export const proxy = {
  createApplicationServiceProxy,
  createProfileManagementServiceProxy,
  createOffersServiceProxy,
  createMessagingServiceProxy,
  createMailServiceProxy,
  createReportingAndHistoryServiceProxy,
  createModerationServiceProxy,
  createIMMServiceProxy
}