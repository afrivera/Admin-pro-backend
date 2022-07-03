/*
    Route: /api/doctors
*/

const { Router } = require('express');
const { postDoctor, getDoctors, putDoctor, destroyDoctor } = require('../controllers/doctors');
const { validateJWT } = require('../middlewares/validate-jwt');
const { schemaValidator } = require('../middlewares/validator');
const { user, idUser } = require('../schemas/user');

const router = Router();

router.get('/',/*  validateJWT, */ getDoctors)
router.post('/', /* schemaValidator( user ), */ postDoctor)
router.put('/:id', validateJWT, schemaValidator( idUser), putDoctor)
router.delete('/:id', validateJWT, schemaValidator( idUser), destroyDoctor)

module.exports = router;
