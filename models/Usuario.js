/**
 * Created by MarcoAntonio on 03/02/2017.
 */
'use strict';

var mongoose = require('mongoose');

const hash = require('hash.js');

var validator = require('validator');

// Create schema
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: { type: String, index: true },
    clave: String
});


usuarioSchema.statics.createUser = function (nuevoUsuario, cb) {


    //validar campos
    if (!validator.isEmail(nuevoUsuario.email)) {
        return cb({ code: 409, message: __('WRONG_EMAIL') });
    }

    if (!validator.isAlphanumeric(nuevoUsuario.nombre)) {
        return cb({ code: 409, message: __('WRONG_NAME')});
    }

    if (!validator.isLength(nuevoUsuario.clave, {min:8})) {
        return cb({ code: 409, message: __('PASSWORD_TOO_SMALL')});
    }

    // comprobar que el usuario no exista
    Usuario.findOne({ email: nuevoUsuario.email }, function (err, user) {
        if (err) {
            return cb(err);
        }

        if (user) {
            return cb({ code: 409, message: __('DUPLICATED_USER') });
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
