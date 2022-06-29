const { Router } = require('express');

// Routes
const authRouter = require('./auth');

const router = Router();


router.use('/auth', authRouter)

module.exports = router;
