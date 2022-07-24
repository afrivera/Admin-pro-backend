const { ErrorObject } = require("../helpers/error");
const Doctor = require("../models/doctor");


exports.getAllDoctors = async()=>{
    try {
        const Doctors = await Doctor.find()
            .populate('user', 'name image')
            .populate('hospital', 'name image')
        if( !Doctors || Doctors.length === 0 ){
            throw new ErrorObject('No Doctors Found', 404)
        }
        return Doctors;
    } catch (error) {
        throw new ErrorObject( error.message, error.statusCode || 500 );
    }
}
exports.getDoctorById = async( id )=>{
    try {
        const doctor = await Doctor.findById( id )
            .populate('user', 'name image')
            .populate('hospital', 'name image')
        if( !doctor || doctor.length === 0 ){
            throw new ErrorObject('No Doctor Found', 404)
        }
        return doctor;
    } catch (error) {
        throw new ErrorObject( error.message, error.statusCode || 500 );
    }
}
  
exports.createDoctor = async ( body ) => {
    try {
        const doctor = new Doctor( body );
        await doctor.save();
        return doctor;
        
    } catch (error) {
        throw new ErrorObject( error.message, error.statusCode || 500 );
    }
}
  
exports.updateDoctor = async ( id, body) => {
    try {
        const doctor = await Doctor.findById( id );
        if( !doctor ){
            throw new ErrorObject('Doctor doesn\'t exist', 404)
        }
        const doctorDb = await Doctor.findByIdAndUpdate( id, body, { new: true} )
        return doctorDb;
        
    } catch (error) {
        throw new ErrorObject( error.message, error.statusCode || 500 );
    }
}
  
exports.destroyDoctor = async ( id) => {
    try {
        const doctor = await Doctor.findById( id );
        if( !doctor ){
            throw new ErrorObject('Doctor doesn\'t exist', 404)
        }
        
        const doctorDb = await Doctor.findByIdAndRemove( id )
        return doctorDb;
        
    } catch (error) {
        throw new ErrorObject( error.message, error.statusCode || 500 );
    }
}
