/**
 * Created by MarcoAntonio on 03/02/2017.
 */
"use strict";

var mongoose = require('mongoose');

// Create schema
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});
