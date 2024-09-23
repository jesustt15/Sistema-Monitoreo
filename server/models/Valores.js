const {Schema, model, SchemaTypes, default: mongoose} = require('mongoose');


const valoresSchema = Schema({
    lugar:{type: mongoose.ObjectId , ref: 'Lugar'},
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
