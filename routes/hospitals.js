/*
    Route: /api/hospitals
*/

const { Router } = require('express');
const { postHospital, getHospitals, putHospital, destroyHospital } = require('../controllers/hospitals');
const { validateJWT } = require('../middlewares/validate-jwt');
const { schemaValidator } = require('../middlewares/validator');
const { hospital, idHospital } = require('../schemas/hospital');

const router = Router();

router.get('/',/*  validateJWT, */ getHospitals)
router.post('/', validateJWT, schemaValidator( hospital ), postHospital)
router.put('/:id', validateJWT, schemaValidator( idHospital), putHospital)
router.delete('/:id', validateJWT, schemaValidator( idHospital), destroyHospital)

module.exports = router;
