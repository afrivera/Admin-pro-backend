const { model, Schema} = require('mongoose');

const doctorSchema = Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
},
/* {
    // if i want to change the name of the table
    collection: 'doctores'
} */);

doctorSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject()
    return object
})

module.exports = model('Doctor', doctorSchema );