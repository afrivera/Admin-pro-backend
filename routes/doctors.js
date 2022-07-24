/*
    Route: /api/doctors
*/

const { Router } = require('express');
const { postDoctor, getDoctors, putDoctor, destroyDoctor, getDoctorById } = require('../controllers/doctors');
const { validateJWT } = require('../middlewares/validate-jwt');
const { schemaValidator } = require('../middlewares/validator');
const { doctor, idDoctor } = require('../schemas/doctor');

const router = Router();

router.get('/', validateJWT,  getDoctors)
router.get('/:id', validateJWT,  getDoctorById)
router.post('/', validateJWT, schemaValidator( doctor ), postDoctor)
router.put('/:id', validateJWT, schemaValidator( idDoctor), putDoctor)
router.delete('/:id', validateJWT, schemaValidator( idDoctor), destroyDoctor)

module.exports = router;
