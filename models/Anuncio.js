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

// ponemos unos métodos al schema...
// ... listar anuncios
anuncioSchema.statics.list = function(filter,callback){
    const query = Anuncio.find(filter);
    query.exec(callback);
}

// ... listar tags permitidos
anuncioSchema.statics.allowedTags = function () {
    return ['work', 'lifestyle', 'motor', 'mobile'];
};

// Convert the schema to a model:
const Anuncio = mongoose.model('Anuncio', anuncioSchema);



