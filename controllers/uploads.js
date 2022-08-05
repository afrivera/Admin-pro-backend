const createHttpError = require("http-errors");
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { catchAsync } = require("../helpers/catchAsync");
const { ErrorObject } = require("../helpers/error");
const { endpointResponse } = require("../helpers/success");
const { updateImage } = require("../services/uploads");


module.exports = {
    fileUpload: catchAsync( async (req, res, next )=> {
        try {
            const { collection, id } = req.params;
            const validTypes = ['hospitals', 'doctors', 'users'];
            if(!validTypes.includes( collection )){
                throw new ErrorObject(`collection  should be doctors, hospitals or users`, 400)
            }

            if( !req.file){
                throw new ErrorObject(`there is no any file in the request`, 400)
            }


            const file = req.file;            

            const separeName = file.originalname.split('.');
            const extFile = separeName[ separeName.length - 1];

            // generate name file
            const nameFile = `${ uuidv4()}.${ extFile }`;

            // path to save images
            const pathOld = `./uploads/${ file.originalname }`
            const path = `./uploads/${ collection }/${ nameFile }`;

            // // move the image
            fs.renameSync( pathOld, path, err => {
                if( err ){
                    throw new ErrorObject(`there is an error trying to move the image`, 500)
                }
            })

            const response = await updateImage( collection, id, nameFile)

            endpointResponse({
                res,
                body: response,
                message: 'fileupload retrieved successfully'
            })
            
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving uploadFile] - [uploads - PUT]: ${ error.message }`
            )
            next( httpError )
        }
    }),
    getImage: catchAsync( async (req, res, next) => {
        const { collection, file } = req.params;

        const pathImg = path.join( __dirname, `../uploads/${ collection }/${ file }`);
        // image by default
        if( fs.existsSync( pathImg) ){
            res.sendFile( pathImg )
        } else {
            const pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
            res.sendFile( pathImg)
        }



    })
}