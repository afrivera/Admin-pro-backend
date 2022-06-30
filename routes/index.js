const { Router } = require('express');

// Routes
const authRouter = require('./users');

const router = Router();


router.use('/users', authRouter)

module.exports = router;
