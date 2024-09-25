const {Schema, model, SchemaTypes, default: mongoose} = require('mongoose');


const hist_valorSchema = Schema({
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
    }

})

module.exports = model('Hist_valor', hist_valorSchema);