/*
    Route: /api/uploads/:collection/:id
*/

const { Router } = require('express');
// const expressFileUpload = require('express-fileupload')
const multer = require('multer');

const { fileUpload, getImage } = require('../controllers/uploads');
const { validateJWT } = require('../middlewares/validate-jwt');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb){
        cb(null, `${file.originalname}`)
    }
})

const upload = multer({ storage: storage })
const router = Router();

// router.use( expressFileUpload() );
router.put('/:collection/:id', [validateJWT, upload.single('image')], fileUpload)
router.get('/:collection/:file',  getImage)

module.exports = router;
