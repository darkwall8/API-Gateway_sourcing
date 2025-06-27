import { createServiceProxy } from "../services/proxy.service";
import { proxyConfig } from "../../config/proxy.config";
import {logger} from "../../utils/logger";

const createProfileManagementServiceProxy = () => {
  return createServiceProxy(
    'profile management service',
    proxyConfig.profileManagementService.target,
    proxyConfig.profileManagementService.pathRewrite
  )
}

const createOffersServiceProxy = () => {
  return createServiceProxy(
    'offers service',
    proxyConfig.offersService.target,
    proxyConfig.offersService.pathRewrite
  )
}

const createApplicationServiceProxy = () => {
  return createServiceProxy(
    'application service',
    proxyConfig.applicationService.target,
    proxyConfig.applicationService.pathRewrite
  )
}

const createMessagingServiceProxy = () => {
  return createServiceProxy(
    'messaging service',
    proxyConfig.messagingService.target,
    proxyConfig.messagingService.pathRewrite
  )
}

const createMailServiceProxy = () => {
  return createServiceProxy(
    'mail service',
    proxyConfig.mailService.target,
    proxyConfig.mailService.pathRewrite
  )
}

const createReportingAndHistoryServiceProxy = () => {
  return createServiceProxy(
    'reporting service',
    proxyConfig.reportingAndHistoryService.target,
    proxyConfig.reportingAndHistoryService.pathRewrite
  )
}

const createModerationServiceProxy = () => {
  return createServiceProxy(
    'moderation service',
    proxyConfig.moderationService.target,
    proxyConfig.moderationService.pathRewrite
  )
}

const createIMMServiceProxy = () => {
  logger.info("IMM Service proxy")
  return createServiceProxy(
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