const fs = require('fs');
const { ErrorObject } = require("../helpers/error");
const User = require("../models/user")
const Hospital = require("../models/hospital")
const Doctor = require("../models/doctor")

const _deleteImage = ( path ) => {
    if( fs.existsSync(path) ){
        fs.unlinkSync( path )
    }
}

exports.updateImage = async( collection, id, nameFile )=>{
    try {
        // const regex = new RegExp(search, 'i');
        let data;
        
        switch (collection) {
            case 'doctors':
                data = await Doctor.findById( id )
                if( !data ){
                    return false
                }
                const oldPath = `./uploads/doctors/${ data.image }`;
                _deleteImage( oldPath );

                data.image = nameFile;
                data.save();
                break;

            case 'hospitals':
                data = await Hospital.findById( id )
                if( !data ){
                    return false
                }
                const oldPathHospital = `./uploads/hospitals/${ data.image }`;
                // _deleteImage( oldPathHospital );

                data.image = nameFile;
                data.save();
                break;
            case 'users':
                data = await User.findById( id );
                if( !data ){
                    return false
                }
                const oldPathUsers = `./uploads/users/${ data.image }`;
                _deleteImage( oldPathUsers );

                data.image = nameFile;
                data.save();
                break;
        
            default:
                throw new ErrorObject('collection should be: doctors, hospitals or users', 403);
        }
        
        return data;
    } catch (error) {
        throw new ErrorObject( error.message, error.statusCode || 500 );
    }
}