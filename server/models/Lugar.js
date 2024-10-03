const {Schema, model, SchemaTypes} = require('mongoose');


const lugarSchema = Schema({
    name:{
        type:String,
        required: true
    },
    tempMin: {
        type: Number,
        
    },
    tempMax: {
        type: Number,
        validate: {
            validator: function(value) {
              return value >= this.tempMin;
            },
            message: 'La temperatura máxima debe ser mayor o igual a la temperatura mínima'
          }
        
        
    },
    humMin:{
        type: Number,
    },
    humMax:{
        type: Number,
        validate: {
            validator: function(value) {
              return value >= this.humMin;
            },
            message: 'La humedad máxima debe ser mayor o igual a la humedad mínima'
          }
    },
})

module.exports = model('Lugar', lugarSchema);