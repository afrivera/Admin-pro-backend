const { model, Schema} = require('mongoose');

const hospitalSchema = Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
/* {
    // if i want to change the name of the table
    collection: 'hospitales'
} */);

hospitalSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject()
    return object
})

module.exports = model('Hospital', hospitalSchema );