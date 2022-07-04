/*
    Route: /api/all
*/

const { Router } = require('express');
const { searchs, searchByCollection } = require('../controllers/searchs');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/search/:search', validateJWT, searchs)
router.get('/collection/:collection/:search', validateJWT, searchByCollection)

module.exports = router;
