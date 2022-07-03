/*
    Route: /api/hospitals
*/

const { Router } = require('express');
const { postHospital, getHospitals, putHospital, destroyHospital } = require('../controllers/hospitals');
const { validateJWT } = require('../middlewares/validate-jwt');
const { schemaValidator } = require('../middlewares/validator');
const { user, idUser } = require('../schemas/user');

const router = Router();

router.get('/',/*  validateJWT, */ getHospitals)
router.post('/', /* schemaValidator( user ), */ postHospital)
router.put('/:id', validateJWT, schemaValidator( idUser), putHospital)
router.delete('/:id', validateJWT, schemaValidator( idUser), destroyHospital)

module.exports = router;
