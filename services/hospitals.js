const { ErrorObject } = require("../helpers/error");
const Hospital = require("../models/hospital");


exports.getAllHospitals = async()=>{
    try {
        const hospitals = await Hospital.find()
        if( !hospitals || hospitals.length === 0 ){
            throw new ErrorObject('No Hospitals Found', 404)
        }
        return hospitals;
    } catch (error) {
        throw new ErrorObject( error.message, error.statusCode || 500 );
    }
}
  
exports.createHospital = async ( body ) => {
    try {
        const emailExist = await this.getUserByEmail( body.email );
        if( emailExist ){
            throw new ErrorObject('Email already exist', 404)
        }
        const hospital = new Hospital( body );
        await hospital.save();
        return hospital;
        
    } catch (error) {
        throw new ErrorObject( error.message, error.statusCode || 500 );
    }
}
  
exports.updateHospital = async ( id, body) => {
    try {
        const hospital = await Hospital.findById( id );
        if( !hospital ){
            throw new ErrorObject('hospital doesn\'t exist', 404)
        }
        const hospitalDb = await Hospital.findByIdAndUpdate( id, body, { new: true} )
        return hospitalDb;
        
    } catch (error) {
        throw new ErrorObject( error.message, error.statusCode || 500 );
    }
}
  
exports.destroyHospital = async ( id) => {
    try {
        const hospital = await Hospital.findById( id );
        if( !hospital ){
            throw new ErrorObject('hospital doesn\'t exist', 404)
        }
        
        const hospitalDb = await Hospital.findByIdAndRemove( id )
        return hospitalDb;
        
    } catch (error) {
        throw new ErrorObject( error.message, error.statusCode || 500 );
    }
}
