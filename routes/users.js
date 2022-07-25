/*
    Route: /api/users
*/

const { Router } = require('express');
const { getUsers, postUser, putUser, destroyUser } = require('../controllers/users');
const { validateJWT, isOwnerOrAdminRole } = require('../middlewares/validate-jwt');
const { schemaValidator } = require('../middlewares/validator');
const { user, idUser } = require('../schemas/user');

const router = Router();

router.get('/', validateJWT,getUsers)
router.post('/', schemaValidator( user ), postUser)
router.put('/:id', [validateJWT, schemaValidator( idUser), isOwnerOrAdminRole], putUser)
router.delete('/:id', [validateJWT, schemaValidator( idUser), isOwnerOrAdminRole], destroyUser)

module.exports = router;
