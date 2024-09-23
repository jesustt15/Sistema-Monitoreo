const {Schema, model, SchemaTypes} = require('mongoose');


const lugarSchema = Schema({
    lugar:{
        type:String,
        required: true
    },
    tempMin: {
        type: Number,
        
    },
    tempMax: {
        type: Number,
        
    },
    humMin:{
        type: Number,
    },
    humMax:{
        type: Number,
    },
})

module.exports = model('Lugar', lugarSchema);