# API-Gateway_sourcing
API-gateway to link all the different services of sourcing app

## Description

This project is the Gateway API of sourcing application which connects student in search of
internship and enterprise. <br/>This gateway is made with Express.ts, it works as a unique entry 
point for all the request of the microservices of sourcing app.

## Architecture

This gateway is designed to route all request to the different microservice: 
- Profile Service 
- Offers service
- Applications service
- SMTP service
- Messaging service
- Reporting and history
- Moderation

## Prerequisites

- Node.js(v18 or higher)
- npm
- Typescript(v5.0 or higher)

## Installation 

```shell
#clone repository
git clone https://github.com/darkwall8/API-Gateway_sourcing.git
cd API-Gateway_sourcing

#install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit the .env file with your own configurations
```

## Configuration 

Create an .env file at the root with this variable :
```dotenv
# server configuration
PORT=3000
NODE_ENV=development

# Allowed URL
ALLOWED_ORIGINS=http://localhost:3001;http://localhost:3002;http://localhost:3003...


# URLs of microservices 
PROFILE_MANAGEMENT_SERVICE_URL=http://localhost:3001
OFFERS_SERVICE_URL=http://localhost:3002
APPLICATION_SERVICE_URL=http://localhost:3003
MESSAGING_SERVICE_URL=http://localhost:3004
SMTP_SERVICE_URL=http://localhost:3005
REPORTING_HISTORY_SERVICE_URL=http://localhost:3006
MODERATION_SERVICE=http://localhost:3007

# Security
JWT_SECRET=your_secret_key
JWT_EXPIRES=1h
 ```

## launch 

```shell
# Development
npm run dev

# Production
npm run build
npm start
```

## Project structure

```shell
.
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── api
│   │   ├── controllers
│   │   │   └── proxy.controller.ts
│   │   ├── middleware
│   │   │   ├── logger.middleware.ts
│   │   │   ├── rate-limiter.middleware.ts
│   │   │   └── validation.middleware.ts
│   │   ├── router
│   │   │   ├── auth.routes.ts
│   │   │   ├── index.ts
│   │   │   └── services.routes.ts
│   │   └── services
│   │       └── proxy.service.ts
│   ├── app.ts
│   ├── config
│   │   ├── app.config.ts
│   │   ├── index.ts
│   │   └── proxy.config.ts
│   ├── server.ts
│   ├── specs
│   │   └── Sourcing.yaml
│   ├── types
│   │   └── types.ts
│   └── utils
│       ├── error-handler.ts
│       └── logger.ts
└── tsconfig.json

```
## Monitoring and logs 

The gateway integrates :
- Winston for the logs management
- Endpoint/health for healthcheck

## Security

- Authenticate application with JWT
- Rate limiting to prevent DDoS attacks
- Request validator
- Secure headers (CORS, Helmet)

## Tests

```shell
# Execute tests
npm test 

# Verify test coverage 
npm run test:coverage
```

## Containerization 

## API Documentation

## Contributions

no needs for now 

## Licence 

all right reserved &copy; FTD 