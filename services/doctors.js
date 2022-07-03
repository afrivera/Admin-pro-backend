const { ErrorObject } = require("../helpers/error");
const Doctor = require("../models/doctor");


exports.getAllDoctors = async()=>{
    try {
        const Doctors = await Doctor.find()
        if( !Doctors || Doctors.length === 0 ){
            throw new ErrorObject('No Doctors Found', 404)
        }
        return Doctors;
    } catch (error) {
        throw new ErrorObject( error.message, error.statusCode || 500 );
    }
}
  
exports.createDoctor = async ( body ) => {
    try {
        const emailExist = await this.getUserByEmail( body.email );
        if( emailExist ){
            throw new ErrorObject('Email already exist', 404)
        }
        const Doctor = new Doctor( body );
        await Doctor.save();
        return Doctor;
        
    } catch (error) {
        throw new ErrorObject( error.message, error.statusCode || 500 );
    }
}
  
exports.updateDoctor = async ( id, body) => {
    try {
        const Doctor = await Doctor.findById( id );
        if( !Doctor ){
            throw new ErrorObject('Doctor doesn\'t exist', 404)
        }
        const DoctorDb = await Doctor.findByIdAndUpdate( id, body, { new: true} )
        return DoctorDb;
        
    } catch (error) {
        throw new ErrorObject( error.message, error.statusCode || 500 );
    }
}
  
exports.destroyDoctor = async ( id) => {
    try {
        const Doctor = await Doctor.findById( id );
        if( !Doctor ){
            throw new ErrorObject('Doctor doesn\'t exist', 404)
        }
        
        const DoctorDb = await Doctor.findByIdAndRemove( id )
        return DoctorDb;
        
    } catch (error) {
        throw new ErrorObject( error.message, error.statusCode || 500 );
    }
}
