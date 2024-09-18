const  mongoose  = require("mongoose");

const dbConnection = async() =>{



    try {

         await mongoose.connect( 'mongodb+srv://masisajt:Alessia15@sensordb.l8cegdv.mongodb.net/');
        console.log('db online');
        
    } catch (error) {
        console.log(error);
        throw new Error('paso un beta en el db');
    }
}

module.exports = {dbConnection};