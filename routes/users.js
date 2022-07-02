/*
    Route: /api/users
*/

const { Router } = require('express');
const { getUsers, postUser, putUser, destroyUser } = require('../controllers/users');
const { schemaValidator } = require('../middlewares/validator');
const { user } = require('../schemas/user');

const router = Router();

router.get('/', getUsers)
router.post('/', schemaValidator( user ), postUser)
router.put('/:id', putUser)
router.delete('/:id', destroyUser)

module.exports = router;
