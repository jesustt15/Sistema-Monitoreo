const {Schema, model, SchemaTypes} = require('mongoose');


const temperaturaSchema = Schema({
    id:{
        type:String,
        required: true
    },
    tempValue: {
        type: Number,
        required:true
    },
    tempFecha: {
        type: Date,
        default: Date.now,
        expires: '30d'
    }

})

module.exports = model('Temperatura', temperaturaSchema);