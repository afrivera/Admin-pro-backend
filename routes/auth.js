/*
    Route: /api/auth
*/

const { Router } = require('express');
const { login, loginGoogle } = require('../controllers/users');
const { schemaValidator } = require('../middlewares/validator');
const { auth } = require('../schemas/auth');

const router = Router();

router.post('/login',[
    schemaValidator( auth )
], login );

router.post('/login/google',[
], loginGoogle )

module.exports = router;
