const { Router } = require('express');

// Routes
const userRouter = require('./users');
const authRouter = require('./auth');
const hospitalRouter = require('./hospitals');
const doctorRouter = require('./doctors');
const searchRouter = require('./searchs');
const uploadRouter = require('./uploads');

const router = Router();


router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/hospitals', hospitalRouter)
router.use('/doctors', doctorRouter)
router.use('/all', searchRouter)
router.use('/uploads', uploadRouter)

module.exports = router;
