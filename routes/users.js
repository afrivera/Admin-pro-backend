/*
    Route: /api/users
*/

const { Router } = require('express');
const { getUsers, postUser, putUser, destroyUser } = require('../controllers/users');
const { schemaValidator } = require('../middlewares/validator');
const { user, idUser } = require('../schemas/user');

const router = Router();

router.get('/', getUsers)
router.post('/', schemaValidator( user ), postUser)
router.put('/:id',schemaValidator( idUser), putUser)
router.delete('/:id',schemaValidator( idUser), destroyUser)

module.exports = router;
