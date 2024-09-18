const {Schema, model, SchemaTypes} = require('mongoose');


const valoresSchema = Schema({
    id:{
        type:String,
        required: true
    },
    tempValue: {
        type: Number,
        required:true
    },
    humValue:{
        type: Number,
        required: true
    },
    valueFecha: {
        type: Date,
        default: Date.now,
        expires: '30d'
    }

})

module.exports = model('Valores', valoresSchema);