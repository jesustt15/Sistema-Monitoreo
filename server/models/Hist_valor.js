const {Schema, model, SchemaTypes, default: mongoose} = require('mongoose');


const hist_valorSchema = Schema({
    value_id:{type: mongoose.ObjectId, ref: 'Valores'} ,


})

module.exports = model('Hist_valor', hist_valorSchema);