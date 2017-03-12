/**
 * Created by MarcoAntonio on 03/02/2017.
 */
"use strict";

var mongoose = require('mongoose');

const hash = require('hash.js');

// Create schema
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});


usuarioSchema.statics.createUser = function (nuevoUsuario, cb) {

    // comprobar que el usuario no exista
    Usuario.findOne({ email: nuevoUsuario.email }, function (err, user) {
        if (err) {
            return cb(err);
        }

        if (user) {
            return cb({ code: 409, message: 'usuario duplicado' });
        } else {
            // hash de la clave
            var claveHash = hash.sha256().update(nuevoUsuario.clave).digest('hex');

            nuevoUsuario.clave = claveHash;

            // creo el usuario
            new Usuario(nuevoUsuario).save(cb);
        }
    });
};

// Convert the schema to a model:
const Usuario = mongoose.model('Usuario', usuarioSchema);
