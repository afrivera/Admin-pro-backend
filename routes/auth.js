/*
    Route: /api/auth
*/

const { Router } = require('express');
const { login, loginGoogle, renewToken } = require('../controllers/users');
const { validateJWT } = require('../middlewares/validate-jwt');
const { schemaValidator } = require('../middlewares/validator');
const { auth } = require('../schemas/auth');

const router = Router();

router.post('/login',[
    schemaValidator( auth )
], login );

router.post('/login/google',[
], loginGoogle )

router.get('/renew', validateJWT, renewToken )

module.exports = router;
