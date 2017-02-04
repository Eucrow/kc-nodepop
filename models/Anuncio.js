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

anuncioSchema.static.list = function (){
    const query = anuncio.find();
    query.exec();
}


// Convert the schema to a model:
var Anuncio = mongoose.model('Anuncio', anuncioSchema);


var anuncio = new Anuncio(
    {
        "nombre": "Bicicleta",
        "venta": true,
        "precio": 230.15,
        "foto": "bici.jpg",
        "tags": [ "lifestyle", "motor"]
    }
);

// anuncio.save(function (err, anuncio) {
//      if (err) return console.error(err);
//      console.log(anuncio);
// });


// no hace falta exportalo porque mongoose me lo guarda internamente
//module.exports = Agente;
