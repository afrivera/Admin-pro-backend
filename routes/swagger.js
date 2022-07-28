/*
    Route: /api/docs
*/
const { Router } = require('express');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const { configSwagger } = require('../swagger/config');

const router = Router();

const specs = swaggerJSDoc( configSwagger );
router.use('/', swaggerUI.serve, swaggerUI.setup( specs, { explorer: true}));

module.exports = router;