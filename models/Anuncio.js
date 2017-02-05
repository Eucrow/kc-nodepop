/**
 * Created by MarcoAntonio on 30/01/2017.
 */
"use strict";

var mongoose = require('mongoose');

// Create schema
var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

// ponemos un método al schema
anuncioSchema.statics.list = function(callback){
    const query = Anuncio.find();
    query.exec(callback);
}


// Convert the schema to a model:
const Anuncio = mongoose.model('Anuncio', anuncioSchema);


// anuncio.save(function (err, anuncio) {
//      if (err) return console.error(err);
//      console.log(anuncio);
// });


// no hace falta exportalo porque mongoose me lo guarda internamente
// module.exports = Anuncio;
