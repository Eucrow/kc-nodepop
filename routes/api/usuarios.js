/**
 * Created by MarcoAntonio on 04/02/2017.
 */
"use strict";

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario'); // como mongoose ya tiene definido el modelo, se lo pedimos

router.post('/register', function (req, res, next) {

    const usuario = new Usuario(req.body);

    usuario.save(function(err, usuarioCreado){
        if (err) {
            next(err); // le decimos que devuelva el next de error que está en app.js
            return;
        }

        res.json({success: true, data: usuarioCreado});
    });


})

module.exports = router;