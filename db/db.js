const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.BD_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('db Online')
    } catch (error) {
        console.log(error)
        throw new Error('Error initialize DB')
    }
}

module.exports = {
    dbConnection
};

